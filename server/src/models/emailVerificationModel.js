const pool = require("../config/db");

async function createVerification(userId, otpHash, expiresAt) {
  await pool.query(
    "DELETE FROM email_verifications WHERE user_id = $1",
    [userId]
  );

  const result = await pool.query(
    `INSERT INTO email_verifications
     (user_id, otp_hash, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, otpHash, expiresAt]
  );

  return result.rows[0];
}

async function findVerificationByUserId(userId) {
  const result = await pool.query(
    `SELECT * FROM email_verifications
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
}

module.exports = {
  createVerification,
  findVerificationByUserId,
  incrementAttempts,
  deleteVerification,
};

async function incrementAttempts(userId) {
  const result = await pool.query(
    `UPDATE email_verifications
     SET attempts = attempts + 1
     WHERE user_id = $1
     RETURNING attempts`,
    [userId]
  );

  return result.rows[0];
}

async function deleteVerification(userId) {
  await pool.query(
    `DELETE FROM email_verifications
     WHERE user_id = $1`,
    [userId]
  );
}