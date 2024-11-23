import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import Modal from "../components/Modal";
import Header from "../layouts/Header";

const Tasks = () => {
  const { userId } = useParams();  
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ description: "", dueDate: "", comments: "", status: "Pending" });
  const [errors, setErrors] = useState({ description: "", dueDate: "", status: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const updateTasksForUser = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = storedTasks.filter(task => task.userId === parseInt(userId));  
    setTasks(filteredTasks);  
  };

  useEffect(() => {
    updateTasksForUser();  
  }, [userId]);

  const validateForm = () => {
    const newErrors = { description: "", dueDate: "", status: "" };
    if (!taskForm.description.trim()) newErrors.description = "Description is required.";
    if (!taskForm.dueDate) newErrors.dueDate = "Due Date is required.";
    if (!taskForm.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newTask = {
      ...taskForm,
      userId: parseInt(userId), 
      id: Date.now(), 
    };
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));  

    updateTasksForUser(); 

    setTaskForm({ description: "", dueDate: "", comments: "", status: "Pending" }); 
    setModalOpen(false);  
  };

  const handleUpdate = (task) => {
    setTaskForm(task);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = (taskId) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));  
    updateTasksForUser();  
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#c5c3d5] p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#262b34] mb-6 sm:mb-8">
          Tasks for User {userId}
        </h1>

        <button
          className="w-full sm:w-auto bg-[#262b34] text-[#c5c3d5] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-[#1f2329] transition-all duration-300 mb-4 sm:mb-6"
          onClick={() => {
            setIsEditing(false);
            setTaskForm({ description: "", dueDate: "", comments: "", status: "Pending" });
            setModalOpen(true);
          }}
        >
          Add Task
        </button>

        <div className="bg-[#262b34] p-4 sm:p-6 rounded-xl shadow-xl">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border-b border-[#c5c3d5] flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#333a42] rounded-lg mb-4"
              >
                <div className="text-[#c5c3d5]">
                  <h3 className="font-medium">{task.description}</h3>
                  <p className="text-sm">{task.dueDate} - {task.status}</p>
                  <p className="text-xs">{task.comments}</p>
                </div>
                <div className="mt-2 sm:mt-0 space-x-4">
                  <button
                    className="text-[#c5c3d5] hover:text-[#b4b2c1] transition-colors bg-inherit"
                    onClick={() => handleUpdate(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400 transition-colors bg-inherit"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#c5c3d5] text-lg text-center bg-inherit">No tasks found</p>
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <div className="bg-[#262b34] p-6 sm:p-8 rounded-lg shadow-2xl w-full sm:w-96">
              <h2 className="text-[#c5c3d5] text-lg sm:text-xl mb-4 bg-inherit">
                {isEditing ? "Edit Task" : "Add New Task"}
              </h2>

              {/* Task Form Fields */}
              <input
                type="text"
                className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                  errors.description ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.description ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                placeholder="Task Description"
                value={taskForm.description}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: "" });
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.description}</p>
              )}

              <input
                type="date"
                className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                  errors.dueDate ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.dueDate ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                value={taskForm.dueDate}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, dueDate: e.target.value });
                  if (errors.dueDate) setErrors({ ...errors, dueDate: "" });
                }}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.dueDate}</p>
              )}

              <select
                className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                  errors.status ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.status ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                value={taskForm.status}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, status: e.target.value });
                  if (errors.status) setErrors({ ...errors, status: "" });
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.status}</p>
              )}

              <textarea
                className="w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
                rows="4"
                placeholder="Comments"
                value={taskForm.comments}
                onChange={(e) => setTaskForm({ ...taskForm, comments: e.target.value })}
              />

              <div className="flex justify-center mt-4 bg-inherit">
                <button
                  className="bg-[#c5c3d5] text-[#262b34] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#b4b2c1] transition-all duration-300"
                  onClick={handleSave}
                >
                  Save Task
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Tasks;
