const {
  createProject,
  getProjectsByResumeId,
  findProjectById,
  updateProject,
  deleteProject,
} = require("../models/projectModel");

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

    const project = await createProject(resumeId, req.body);

    return res.status(201).json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

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

    const projects = await getProjectsByResumeId(resumeId);

    return res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const projectId = Number(req.params.projectId);

    if (isNaN(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const resume = await findResumeById(project.resume_id, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const updatedProject = await updateProject(projectId, req.body);

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const projectId = Number(req.params.projectId);

    if (isNaN(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const resume = await findResumeById(project.resume_id, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await deleteProject(projectId);

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

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