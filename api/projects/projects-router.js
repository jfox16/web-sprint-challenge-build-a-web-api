const express = require("express");
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateProjectBody,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project.id);
});

router.post("/", validateProjectBody, (req, res) => {
  Projects.insert(req.body)
    .then((project) => res.status(201).json(project))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.put("/:id", validateProjectId, validateProjectBody, (req, res) => {
  Projects.update(req.project.id, req.body)
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.project.id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
