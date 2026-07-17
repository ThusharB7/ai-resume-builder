const {
  createSkill,
  getSkillsByResumeId,
  findSkillById,
  updateSkill,
  deleteSkill,
} = require("../models/skillModel");

const { findResumeById } = require("../models/resumeModel");

const create = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await findResumeById(resumeId, req.user.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const skill = await createSkill(resumeId, req.body);

    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await findResumeById(resumeId, req.user.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const skills = await getSkillsByResumeId(resumeId);

    res.json({
      count: skills.length,
      skills,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { skillId } = req.params;

    const skill = await findSkillById(skillId);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const resume = await findResumeById(skill.resume_id, req.user.id);

    if (!resume) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedSkill = await updateSkill(skillId, req.body);

    res.json({
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { skillId } = req.params;

    const skill = await findSkillById(skillId);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const resume = await findResumeById(skill.resume_id, req.user.id);

    if (!resume) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await deleteSkill(skillId);

    res.json({
      message: "Skill deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};