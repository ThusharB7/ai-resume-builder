const pool = require("../config/db");

async function createResume(userId, title) {
  const result = await pool.query(
    `INSERT INTO resumes (user_id, title)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, title]
  );

  return result.rows[0];
}

async function getUserResumes(userId) {
  const result = await pool.query(
    `SELECT
        id,
        title,
        template,
        status,
        created_at,
        updated_at
     FROM resumes
     WHERE user_id = $1
     ORDER BY updated_at DESC`,
    [userId]
  );

  return result.rows;
}

async function findResumeById(resumeId, userId) {
  const result = await pool.query(
    `SELECT *
     FROM resumes
     WHERE id = $1
     AND user_id = $2`,
    [resumeId, userId]
  );

  return result.rows[0];
}

async function updateResume(
  resumeId,
  userId,
  data
) {
  const {
    title,
    first_name,
    last_name,
    phone,
    email,
    location,
    linkedin,
    github,
    portfolio,
    summary,
    template,
    status,
  } = data;

  const result = await pool.query(
    `UPDATE resumes
     SET
       title = $1,
       first_name = $2,
       last_name = $3,
       phone = $4,
       email = $5,
       location = $6,
       linkedin = $7,
       github = $8,
       portfolio = $9,
       summary = $10,
       template = $11,
       status = $12,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $13
     AND user_id = $14
     RETURNING *`,
    [
      title,
      first_name,
      last_name,
      phone,
      email,
      location,
      linkedin,
      github,
      portfolio,
      summary,
      template,
      status,
      resumeId,
      userId,
    ]
  );

  return result.rows[0];
}

async function deleteResume(resumeId, userId) {
  const result = await pool.query(
    `DELETE FROM resumes
     WHERE id = $1
     AND user_id = $2
     RETURNING id`,
    [resumeId, userId]
  );

  return result.rows[0];
}

module.exports = {
  createResume,
  getUserResumes,
  findResumeById,
  updateResume,
  deleteResume,
};