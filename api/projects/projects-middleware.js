const Projects = require("./projects-model");

const validateProjectId = (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "No project found with that id" });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const validateProjectBody = async (req, res, next) => {
  const project = req.body;

  if (!project) {
    res.status(400).json({
      message: "Request body is required.",
    });
  } else if (req.method === "POST" && (!project.name || !project.description)) {
    // These fields are only required on POSTs
    res.status(400).json({
      message: "name and description are required.",
    });
  } else if (project.id !== undefined) {
    res.status(400).json({
      message: "Cannot set id.",
    });
  } else if (project.actions !== undefined) {
    res.status(400).json({
      message: "Cannot directly set actions.",
    });
  } else {
    next();
  }
};

module.exports = {
  validateProjectId,
  validateProjectBody,
};
