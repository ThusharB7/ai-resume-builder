const {
  createEducation,
  getEducationByResumeId,
  findEducationById,
  updateEducation,
  deleteEducation,
} = require("../models/educationModel");

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

    const education = await createEducation(resumeId, req.body);

    return res.status(201).json({
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error("Create Education Error:", error);

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

    const education = await getEducationByResumeId(resumeId);

    return res.status(200).json({
      count: education.length,
      education,
    });
  } catch (error) {
    console.error("Get Education Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const educationId = Number(req.params.educationId);

    if (isNaN(educationId)) {
      return res.status(400).json({
        message: "Invalid education ID",
      });
    }

    const education = await findEducationById(educationId);

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    const resume = await findResumeById(
      education.resume_id,
      req.user.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    const updatedEducation = await updateEducation(
      educationId,
      req.body
    );

    return res.status(200).json({
      message: "Education updated successfully",
      education: updatedEducation,
    });
  } catch (error) {
    console.error("Update Education Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const educationId = Number(req.params.educationId);

    if (isNaN(educationId)) {
      return res.status(400).json({
        message: "Invalid education ID",
      });
    }

    const education = await findEducationById(educationId);

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    const resume = await findResumeById(
      education.resume_id,
      req.user.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    await deleteEducation(educationId);

    return res.status(200).json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete Education Error:", error);

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