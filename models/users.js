const bcrypt = require('bcryptjs');
const fs = require('fs');

const db = require('./db');

const config = require('../configs');

module.exports = class User {
  static async init() {
    await db.execute('DROP TABLE IF EXISTS users');
    await db.execute(`CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            \`username\` TEXT NOT NULL,
            \`password\` TEXT NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);

    const mockup = JSON.parse(fs.readFileSync(__dirname + '/mockups/users.json'));
    mockup.forEach(async actor => {
      await this.create(actor.username, actor.password);
    });
  }

  static async create(username, password) {
    const salt = bcrypt.genSaltSync(config.bcrypt.saltRounds);
    password = bcrypt.hashSync(password, salt);

    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  }

  static async getByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static checkPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
};
