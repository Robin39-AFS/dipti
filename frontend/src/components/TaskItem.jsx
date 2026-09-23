import { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    
    // Pass both edited title and edited priority
    onEdit(task._id, {
      title: editedTitle,
      priority: editedPriority,
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#0D0E03] border border-[#6C8C17]/30 hover:border-[#6C8C17]/60 p-4 rounded-xl flex items-center justify-between transition-all shadow-md">
      
      {/* ✏️ EDIT MODE */}
      {isEditing ? (
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mr-2">
          {/* Title Input */}
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 bg-black/60 border border-[#6C8C17] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
            autoFocus
          />

          {/* Priority Select */}
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="bg-black/60 border border-[#6C8C17] rounded-lg px-2 py-1.5 text-xs text-[#6C8C17] focus:outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Save & Cancel Buttons */}
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="bg-[#3C7100] hover:bg-[#4f9400] text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* 📋 NORMAL VIEW MODE */
        <div className="flex items-center gap-3">
          {/* Toggle Complete Button */}
          <button
            onClick={() => onToggle(task._id, task.isCompleted)}
            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              task.isCompleted
                ? "bg-[#3C7100] border-[#3C7100] text-white"
                : "border-[#6C8C17] hover:border-white"
            }`}
          >
            {task.isCompleted && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div>
            <h3
              className={`text-base font-medium transition-all ${
                task.isCompleted ? "line-through text-gray-500" : "text-white"
              }`}
            >
              {task.title}
            </h3>
            <span className="text-xs text-[#6C8C17] font-semibold tracking-wide">
              {task.priority} Priority
            </span>
          </div>
        </div>
      )}

      {/* Action Icons (Only show when NOT editing) */}
      {!isEditing && (
        <div className="flex items-center gap-1">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-[#6C8C17] p-2 rounded-lg transition-colors cursor-pointer"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-400 hover:text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default TaskItem;