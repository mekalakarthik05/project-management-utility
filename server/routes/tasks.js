const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks (optionally by phase or assignedTo)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.phase) filter.phase = req.query.phase;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email role')
      .sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET tasks assigned to a specific user (for "my tasks" dashboard)
router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId })
      .populate('assignedTo', 'name email role')
      .sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single task with full history
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email role');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    await task.populate('assignedTo', 'name email role');
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update task (including phase move; history is auto-appended by schema)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email role');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
