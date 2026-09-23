import { useState, useEffect } from "react";
import { API_URL } from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchTasks once when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    // Put the brand new task at the top of the existing tasks array
    setTasks([newTask, ...tasks]);
  };

  // Toggle Complete / Incomplete
  const handleToggle = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      const updatedTask = await response.json();

      // Replace the updated task in our state using .map()
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Edit Task Title
    // Edit Task (Title, Priority, etc.)
  const handleEdit = async (id, updatedFields) => {
    try {
        
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updatedTask = await response.json();

      // Update that specific task in state
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      // Remove the deleted task from our state using .filter()
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-wider text-[#6C8C17]">
          TASK COMMAND
        </h1>
        <p className="text-sm text-gray-400">Full-Stack Task Manager</p>
      </header>

      {/* Add Task Form */}
      <TaskForm onTaskAdded={handleTaskAdded} />

      {/* Task List */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading tasks from database...
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks found. Create your first one!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
