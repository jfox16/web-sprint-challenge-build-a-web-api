
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
