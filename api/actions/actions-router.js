
const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateActionBody } = require('./actions-middleware'); 

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post('/', validateActionBody, (req, res) => {
  Actions.insert(req.body)
    .then(action => res.status(201).json(action.id))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/:id', validateActionId, validateActionBody, (req, res) => {
  Actions.update(req.action.id, req.body)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.action.id)
    .then(numDeleted => res.status(200).json(numDeleted))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
