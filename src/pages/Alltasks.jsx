import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Header from "../layouts/Header";

const Alltasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    description: "",
    dueDate: "",
    status: "",
    userId: "",
  });
  const [errors, setErrors] = useState({ description: "", dueDate: "", status: "", userId: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); 


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const normalizedTasks = savedTasks.map((task) => ({
      ...task,
      userId: Number(task.userId), 
    }));
    setTasks(normalizedTasks);

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const validateForm = () => {
    const newErrors = { description: "", dueDate: "", status: "", userId: "" };
    if (!taskForm.description.trim()) newErrors.description = "Description is required.";
    if (!taskForm.dueDate) newErrors.dueDate = "Due Date is required.";
    if (!taskForm.status) newErrors.status = "Status is required.";
    if (!taskForm.userId) newErrors.userId = "Assigned user is required.";
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const normalizedUserId = Number(taskForm.userId);

    let updatedTasks = [...tasks];
    if (isEditing) {
      const taskIndex = updatedTasks.findIndex((task) => task.id === taskForm.id);
      updatedTasks[taskIndex] = { ...taskForm, userId: normalizedUserId };
    } else {
      const newTask = { ...taskForm, userId: normalizedUserId, id: Date.now() };
      updatedTasks.push(newTask);
    }

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTaskForm({ description: "", dueDate: "", status: "", userId: "" });
    setModalOpen(false);
    setIsEditing(false);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? task.status.toLowerCase() === statusFilter.toLowerCase() : true) 
  );

  const getAssignedUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unassigned";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#c5c3d5] p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#262b34] mb-6 sm:mb-8">
          Task Management
        </h1>

        {/* Search input */}
        <input
          type="text"
          className="w-full mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
          placeholder="Search tasks by description or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter by Status */}
        <select
          className="w-full sm:w-auto mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="w-full sm:w-auto bg-[#262b34] text-[#c5c3d5] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-[#1f2329] transition-all duration-300 mb-4 sm:mb-6"
          onClick={() => {
            setTaskForm({ description: "", dueDate: "", status: "", userId: "" });
            setErrors({ description: "", dueDate: "", status: "", userId: "" });
            setModalOpen(true);
          }}
        >
          Add Task
        </button>

        <div className="bg-[#262b34] p-4 sm:p-6 rounded-xl shadow-xl">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border-b border-[#c5c3d5] flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#333a42] rounded-lg mb-4"
              >
                <span className="text-[#c5c3d5] font-medium bg-inherit">
                  {task.description} - {task.status} (Due: {task.dueDate}) <br />
                  Assigned To: {getAssignedUserName(task.userId)}
                </span>
                <div className="mt-2 sm:mt-0 space-x-4 bg-inherit">
                  <button
                    className="text-[#c5c3d5] hover:text-[#b4b2c1] transition-colors bg-inherit"
                    onClick={() => {
                      setTaskForm(task);
                      setErrors({ description: "", dueDate: "", status: "", userId: "" });
                      setModalOpen(true);
                      setIsEditing(true);
                    }}
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

              {/* Description Input */}
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

              {/* Due Date Input */}
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

              {/* Status Selection */}
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
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.status}</p>
              )}

              {/* User Assignment */}
              <select
                className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                  errors.userId ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.userId ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                value={taskForm.userId}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, userId: Number(e.target.value) });
                  if (errors.userId) setErrors({ ...errors, userId: "" });
                }}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.userId}</p>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  className="bg-[#5b667b] text-[#c5c3d5] px-6 py-3 rounded-lg shadow-lg hover:bg-[#383f4a] transition-all duration-300"
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

export default Alltasks;
