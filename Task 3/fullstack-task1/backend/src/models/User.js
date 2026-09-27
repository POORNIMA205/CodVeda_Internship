import { db } from "../config/db.js";

class User {
  static findOne(email) {
    return db
      .prepare(`
        SELECT id, name, email, password, role, createdAt
        FROM users
        WHERE email = ?
      `)
      .get(email);
  }

  static findById(id) {
    return db
      .prepare(`
        SELECT id, name, email, password, role, createdAt
        FROM users
        WHERE id = ?
      `)
      .get(id);
  }

  static create({ name, email, password, role = "user" }) {
    const result = db
      .prepare(`
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
      `)
      .run(name, email, password, role);

    return User.findById(result.lastInsertRowid);
  }

  static findAll() {
    return db
      .prepare(`
        SELECT id, name, email, role, createdAt
        FROM users
        ORDER BY datetime(createdAt) DESC
      `)
      .all();
  }

  static updateRole(id, role) {
    const result = db
      .prepare(`
        UPDATE users
        SET role = ?
        WHERE id = ?
      `)
      .run(role, id);

    if (result.changes === 0) {
      return null;
    }

    return db
      .prepare(`
        SELECT id, name, email, role
        FROM users
        WHERE id = ?
      `)
      .get(id);
  }
}

export default User;
