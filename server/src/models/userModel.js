const pool = require("../config/db");

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

async function createUser(name, email, passwordHash) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, is_verified, created_at`,
    [name, email, passwordHash]
  );

  return result.rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
  verifyUser,
};

async function verifyUser(userId) {
  const result = await pool.query(
    `UPDATE users
     SET is_verified = TRUE,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, name, email, is_verified`,
    [userId]
  );

  return result.rows[0];
}