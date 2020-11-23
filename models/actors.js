const db = require('../models/db');
const fs = require('fs');

module.exports = class Actor {
  static async init() {
    await db.execute('DROP TABLE IF EXISTS actors');

    await db.execute(`CREATE TABLE IF NOT EXISTS actors (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            \`first_name\` TEXT NOT NULL,
            \`last_name\` TEXT NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);

    const mockup = JSON.parse(fs.readFileSync(__dirname + '/mockups/actors.json'));
    mockup.forEach(async actor => {
      await this.add(actor.first_name, actor.last_name);
    });
  }

  /**
   * Returns all actors
   */
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM actors');
    return rows;
  }

  /**
   * Returns actor by ID
   * @param {number} id Actor's ID
   */
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM actors WHERE `id` = ?', [id]);
    return rows[0];
  }

  /**
   * Adds new actor
   * @param {string} fist_name Actor's first name
   * @param {string} last_name Actor's last name
   */
  static async add(fist_name, last_name) {
    const [rows] = await db.execute(
      'INSERT INTO actors (`first_name`, `last_name`) VALUES (?, ?)',
      [fist_name, last_name]
    );
    return rows;
  }

  /**
   * Edits actor by ID
   * @param {number} id Actor's ID
   * @param {string} first_name Actor's new first name
   * @param {string} last_name Actor's new last name
   */
  static async edit(id, first_name, last_name) {
    const [
      rows,
    ] = await db.execute('UPDATE actors SET `first_name` = ?, `last_name` = ? WHERE `id` = ?', [
      first_name,
      last_name,
      id,
    ]);
    return rows;
  }

  /**
   * Removes actor by ID
   * @param {number} id Actor's ID
   */
  static async remove(id) {
    const [rows] = await db.execute('DELETE FROM actors WHERE `id` = ?', [id]);
    return rows;
  }
};
