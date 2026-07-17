const {
  createResume,
  getUserResumes,
  findResumeById,
  updateResume,
  deleteResume,
} = require("../models/resumeModel");

async function create(req, res) {
  
  try {
    console.log(req.body);

    const { title } = req.body || {};

    if (!title) {
      return res.status(400).json({
        message: "Resume title is required",
      });
    }

    // ...

    

    if (!title) {
      return res.status(400).json({
        message: "Resume title is required",
      });
    }

    const resume = await createResume(
      req.user.id,
      title.trim()
    );

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });

  } catch (error) {
    console.error("Create Resume Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAll(req, res) {
  try {
    const resumes = await getUserResumes(req.user.id);

    return res.status(200).json({
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("Get Resumes Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getOne(req, res) {
  try {
    const resumeId = req.params.id;

    const resume = await findResumeById(
      resumeId,
      req.user.id
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      resume,
    });

  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function update(req, res) {
  try {
    const resumeId = Number(req.params.id);

    if (isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const existingResume = await findResumeById(
      resumeId,
      req.user.id
    );

    if (!existingResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const updatedResume = await updateResume(
      resumeId,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });

  } catch (error) {
    console.error("Update Resume Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function remove(req, res) {
  try {
    const resumeId = Number(req.params.id);

    if (isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const deletedResume = await deleteResume(
      resumeId,
      req.user.id
    );

    if (!deletedResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};