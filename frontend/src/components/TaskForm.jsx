import { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);

    try {
      // Send POST request
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      // render parent add this task to the list
      onTaskAdded(newTask);

      // Reset form
      setTitle("");
      setPriority("Medium");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0D0E03] border border-[#6C8C17]/40 p-4 rounded-xl flex flex-col sm:flex-row gap-3 shadow-md"
    >
      <input
        type="text"
        placeholder="What needs to be done?..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-black/60 border border-[#6C8C17]/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C8C17]"
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-black/60 border border-[#6C8C17]/30 rounded-lg px-3 py-2 text-sm text-[#6C8C17] focus:outline-none focus:border-[#6C8C17]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#3C7100] hover:bg-[#4f9400] text-white font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;