const pool = require("../config/db");

const createSkill = async (resumeId, data) => {
  const { skill_name, category, display_order } = data;

  const result = await pool.query(
    `INSERT INTO skills (resume_id, skill_name, category, display_order)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [resumeId, skill_name, category, display_order || 1]
  );

  return result.rows[0];
};

const getSkillsByResumeId = async (resumeId) => {
  const result = await pool.query(
    `SELECT * FROM skills
     WHERE resume_id = $1
     ORDER BY display_order ASC, id ASC`,
    [resumeId]
  );

  return result.rows;
};

const findSkillById = async (skillId) => {
  const result = await pool.query(
    `SELECT * FROM skills WHERE id = $1`,
    [skillId]
  );

  return result.rows[0];
};

const updateSkill = async (skillId, data) => {
  const { skill_name, category, display_order } = data;

  const result = await pool.query(
    `UPDATE skills
     SET skill_name = $1,
         category = $2,
         display_order = $3
     WHERE id = $4
     RETURNING *`,
    [skill_name, category, display_order, skillId]
  );

  return result.rows[0];
};

const deleteSkill = async (skillId) => {
  await pool.query(`DELETE FROM skills WHERE id = $1`, [skillId]);
};

module.exports = {
  createSkill,
  getSkillsByResumeId,
  findSkillById,
  updateSkill,
  deleteSkill,
};