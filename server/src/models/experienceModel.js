
const pool = require("../config/db");


async function createExperience(resumeId, data) {
  const {
    company,
    position,
    employment_type,
    location,
    start_date,
    end_date,
    currently_working,
    description,
    display_order,
  } = data;

  const result = await pool.query(
    `INSERT INTO experience
    (
      resume_id,
      company,
      position,
      employment_type,
      location,
      start_date,
      end_date,
      currently_working,
      description,
      display_order
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`,
    [
      resumeId,
      company,
      position,
      employment_type,
      location,
      start_date,
      end_date,
      currently_working,
      description,
      display_order,
    ]
  );

  return result.rows[0];
}

async function getExperienceByResumeId(resumeId) {
  const result = await pool.query(
    `SELECT *
     FROM experience
     WHERE resume_id = $1
     ORDER BY display_order ASC`,
    [resumeId]
  );

  return result.rows;
}

async function findExperienceById(experienceId) {
  const result = await pool.query(
    `SELECT *
     FROM experience
     WHERE id = $1`,
    [experienceId]
  );

  return result.rows[0];
}

async function updateExperience(experienceId, data) {
  const {
    company,
    position,
    employment_type,
    location,
    start_date,
    end_date,
    currently_working,
    description,
    display_order,
  } = data;

  const result = await pool.query(
    `UPDATE experience
     SET
      company = $1,
      position = $2,
      employment_type = $3,
      location = $4,
      start_date = $5,
      end_date = $6,
      currently_working = $7,
      description = $8,
      display_order = $9
     WHERE id = $10
     RETURNING *`,
    [
      company,
      position,
      employment_type,
      location,
      start_date,
      end_date,
      currently_working,
      description,
      display_order,
      experienceId,
    ]
  );

  return result.rows[0];
}

async function deleteExperience(experienceId) {
  const result = await pool.query(
    `DELETE FROM experience
     WHERE id = $1
     RETURNING id`,
    [experienceId]
  );

  return result.rows[0];
}

module.exports = {
  createExperience,
  getExperienceByResumeId,
  findExperienceById,
  updateExperience,
  deleteExperience,
};