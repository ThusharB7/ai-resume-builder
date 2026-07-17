const pool = require("../config/db");

async function createProject(resumeId, data) {
  const {
    name,
    description,
    technologies,
    project_url,
    github_url,
    display_order,
  } = data;

  const result = await pool.query(
    `INSERT INTO projects
    (
      resume_id,
      name,
      description,
      technologies,
      project_url,
      github_url,
      display_order
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [
      resumeId,
      name,
      description,
      technologies,
      project_url,
      github_url,
      display_order,
    ]
  );

  return result.rows[0];
}

async function getProjectsByResumeId(resumeId) {
  const result = await pool.query(
    `SELECT *
     FROM projects
     WHERE resume_id = $1
     ORDER BY display_order ASC`,
    [resumeId]
  );

  return result.rows;
}

async function findProjectById(projectId) {
  const result = await pool.query(
    `SELECT *
     FROM projects
     WHERE id = $1`,
    [projectId]
  );

  return result.rows[0];
}

async function updateProject(projectId, data) {
  const {
    name,
    description,
    technologies,
    project_url,
    github_url,
    display_order,
  } = data;

  const result = await pool.query(
    `UPDATE projects
     SET
      name = $1,
      description = $2,
      technologies = $3,
      project_url = $4,
      github_url = $5,
      display_order = $6
     WHERE id = $7
     RETURNING *`,
    [
      name,
      description,
      technologies,
      project_url,
      github_url,
      display_order,
      projectId,
    ]
  );

  return result.rows[0];
}

async function deleteProject(projectId) {
  const result = await pool.query(
    `DELETE FROM projects
     WHERE id = $1
     RETURNING id`,
    [projectId]
  );

  return result.rows[0];
}

module.exports = {
  createProject,
  getProjectsByResumeId,
  findProjectById,
  updateProject,
  deleteProject,
};