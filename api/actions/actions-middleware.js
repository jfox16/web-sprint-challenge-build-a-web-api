const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

const validateActionId = (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "No action found with that id" });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const validateActionBody = async (req, res, next) => {
  const action = req.body;

  if (!action) {
    res.status(400).json({
      message: "Request body is required.",
    });
  } else if (
    req.method === "POST" &&
    (!action.project_id || !action.description || !action.notes)
  ) {
    // These fields are only required on POSTs
    res.status(400).json({
      message: "project_id, description, and notes are required fields.",
    });
  } else if (action.description?.length > 128) {
    res.status(400).json({
      message: "description cannot be more than 128 characters long.",
    });
  } else if (action.id !== undefined) {
    res.status(400).json({
      message: "Cannot set id.",
    });
  } else {
    try {
      const project = await Projects.get(action.project_id);
      if (project) {
        next();
      } else {
        res.status(404).json({
          message: "Could not find a project with that project_id.",
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = {
  validateActionId,
  validateActionBody,
};
