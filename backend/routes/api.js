const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskControllers");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;