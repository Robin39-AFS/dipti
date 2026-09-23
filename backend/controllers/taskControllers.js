const Task = require("../models/task");

// 1. Get all data from the database
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. create
const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;
    
    const newTask = await Task.create({ title, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. update
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. delete
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};