const {
  createExperience,
  getExperienceByResumeId,
  findExperienceById,
  updateExperience,
  deleteExperience,
} = require("../models/experienceModel");

const { findResumeById } = require("../models/resumeModel");

// CREATE
async function create(req, res) {
  try {
    const resumeId = Number(req.params.resumeId);

    if (isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const resume = await findResumeById(resumeId, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    console.log("resumeId:", resumeId);
console.log("req.body:", req.body);

const experience = await createExperience(resumeId, req.body);

    return res.status(201).json({
      message: "experience added successfully",
      experience,
    });
  } catch (error) {
    console.error("Create experience Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// GET ALL
async function getAll(req, res) {
  try {
    const resumeId = Number(req.params.resumeId);

    if (isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const resume = await findResumeById(resumeId, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const experience = await getExperienceByResumeId(resumeId);

    return res.status(200).json({
      count: experience.length,
      experience,
    });
  } catch (error) {
    console.error("Get experience Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const experienceId = Number(req.params.experienceId);

    if (isNaN(experienceId)) {
      return res.status(400).json({
        message: "Invalid experience ID",
      });
    }

    const experience = await findExperienceById(experienceId);

    if (!experience) {
      return res.status(404).json({
        message: "experience not found",
      });
    }

    const resume = await findResumeById(
      experience.resume_id,
      req.user.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "experience not found",
      });
    }

    const updatedexperience = await updateExperience(
      experienceId,
      req.body
    );

    return res.status(200).json({
      message: "experience updated successfully",
      experience: updatedexperience,
    });
  } catch (error) {
    console.error("Update experience Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const experienceId = Number(req.params.experienceId);

    if (isNaN(experienceId)) {
      return res.status(400).json({
        message: "Invalid experience ID",
      });
    }

    const experience = await findExperienceById(experienceId);

    if (!experience) {
      return res.status(404).json({
        message: "experience not found",
      });
    }

    const resume = await findResumeById(
      experience.resume_id,
      req.user.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "experience not found",
      });
    }

    await deleteExperience(experienceId);

    return res.status(200).json({
      message: "experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}



module.exports = {
  create,
  getAll,
  update,
  remove,
};

