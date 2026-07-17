const pool = require("../config/db");

async function createEducation(resumeId, data) {
  const {
    institution,
    degree,
    field_of_study,
    start_date,
    end_date,
    currently_studying,
    grade,
    description,
    display_order,
  } = data;

  const result = await pool.query(
    `INSERT INTO education (
      resume_id,
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      currently_studying,
      grade,
      description,
      display_order
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
    RETURNING *`,
    [
      resumeId,
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      currently_studying,
      grade,
      description,
      display_order,
    ]
  );

  return result.rows[0];
}

async function getEducationByResumeId(resumeId) {
  const result = await pool.query(
    `SELECT *
     FROM education
     WHERE resume_id = $1
     ORDER BY display_order ASC`,
    [resumeId]
  );

  return result.rows;
}

async function findEducationById(educationId) {
  const result = await pool.query(
    `SELECT *
     FROM education
     WHERE id = $1`,
    [educationId]
  );

  return result.rows[0];
}

async function updateEducation(educationId, data) {
  const {
    institution,
    degree,
    field_of_study,
    start_date,
    end_date,
    currently_studying,
    grade,
    description,
    display_order,
  } = data;

  const result = await pool.query(
    `UPDATE education
     SET
       institution = $1,
       degree = $2,
       field_of_study = $3,
       start_date = $4,
       end_date = $5,
       currently_studying = $6,
       grade = $7,
       description = $8,
       display_order = $9
     WHERE id = $10
     RETURNING *`,
    [
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      currently_studying,
      grade,
      description,
      display_order,
      educationId,
    ]
  );

  return result.rows[0];
}

async function deleteEducation(educationId) {
  const result = await pool.query(
    `DELETE FROM education
     WHERE id = $1
     RETURNING id`,
    [educationId]
  );

  return result.rows[0];
}

module.exports = {
  createEducation,
  getEducationByResumeId,
  findEducationById,
  updateEducation,
  deleteEducation,
};