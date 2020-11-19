const pool = require('../database');

module.exports = class Actor {
  static pool = pool;

  /**
   * Returns all actors
   */
  static async getAll() {
    const [rows] = await this.pool.execute('SELECT * FROM actor');
    return rows;
  }

  /**
   * Returns actor by ID
   * @param {number} id Actor's ID
   */
  static async getById(id) {
    const [rows] = await this.pool.execute('SELECT * FROM actor WHERE `actor_id` = ?', [id]);
    return rows[0];
  }

  /**
   * Adds new actor
   * @param {string} fist_name Actor's first name
   * @param {string} last_name Actor's last name
   */
  static async add(fist_name, last_name) {
    const [
      rows,
    ] = await this.pool.execute('INSERT INTO actor (`first_name`, `last_name`) VALUES (?, ?)', [
      fist_name,
      last_name,
    ]);
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
    ] = await this.pool.execute(
      'UPDATE actor SET `first_name` = ?, `last_name` = ? WHERE `actor_id` = ?',
      [first_name, last_name, id]
    );
    return rows;
  }

  /**
   * Removes actor by ID
   * @param {number} id Actor's ID
   */
  static async remove(id) {
    const [rows] = await this.pool.execute('DELETE FROM actor WHERE `actor_id` = ?', [id]);
    return rows;
  }
};
