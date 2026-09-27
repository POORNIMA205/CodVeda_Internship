import { db } from "../config/db.js";

export const UserModel = {
  findById(id) {
    return db.prepare(`
      SELECT id, name, email, password, role, createdAt
      FROM users WHERE id = ?
    `).get(Number(id));
  },

  findByEmail(email) {
    return db.prepare(`
      SELECT id, name, email, password, role, createdAt
      FROM users WHERE email = ?
    `).get(email);
  },

  findAll() {
    return db.prepare(`
      SELECT id, name, email, role, createdAt
      FROM users ORDER BY datetime(createdAt) DESC
    `).all();
  },

  findByIds(ids) {
    if (!ids.length) return [];
    const placeholders = ids.map(() => "?").join(",");
    return db.prepare(`
      SELECT id, name, email, role, createdAt
      FROM users WHERE id IN (${placeholders})
    `).all(...ids.map(Number));
  },

  create({ name, email, password, role = "user" }) {
    const result = db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run(name, email, password, role);
    return this.findById(result.lastInsertRowid);
  },

  updateRole(id, role) {
    const result = db.prepare(`
      UPDATE users SET role = ? WHERE id = ?
    `).run(role, Number(id));
    if (result.changes === 0) return null;
    return this.findById(id);
  }
};
