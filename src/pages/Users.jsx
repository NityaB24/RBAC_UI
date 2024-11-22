import React, { useState } from "react";
import { useRBAC } from "../contexts/RBACContext";
import Modal from "../components/Modal";

const Users = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useRBAC();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", role: "", status: "" });
  const [errors, setErrors] = useState({ name: "", role: "", status: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const validateForm = () => {
    const newErrors = { name: "", role: "", status: "" };
    if (!userForm.name.trim()) newErrors.name = "Name is required.";
    if (!userForm.role) newErrors.role = "Role is required.";
    if (!userForm.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (isEditing) {
      updateUser(userForm);
    } else {
      const newUser = { ...userForm, id: Date.now() };
      addUser(newUser);
    }

    setUserForm({ name: "", role: "", status: "" });
    setModalOpen(false);
    setIsEditing(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#c5c3d5] p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#262b34] mb-6 sm:mb-8">
        User Management
      </h1>

      {/* Search input */}
      <input
        type="text"
        className="w-full mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
        placeholder="Search users by name, role, or status"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        className="w-full sm:w-auto bg-[#262b34] text-[#c5c3d5] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-[#1f2329] transition-all duration-300 mb-4 sm:mb-6"
        onClick={() => {
          setUserForm({ name: "", role: "", status: "" });
          setErrors({ name: "", role: "", status: "" });
          setModalOpen(true);
        }}
      >
        Add User
      </button>

      <div className="bg-[#262b34] p-4 sm:p-6 rounded-xl shadow-xl">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 border-b border-[#c5c3d5] flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#333a42] rounded-lg mb-4"
            >
              <span className="text-[#c5c3d5] font-medium bg-inherit">
                {user.name} - {user.role} ({user.status})
              </span>
              <div className="mt-2 sm:mt-0 space-x-4 bg-inherit">
                <button
                  className="text-[#c5c3d5] hover:text-[#b4b2c1] transition-colors bg-inherit"
                  onClick={() => {
                    setUserForm(user);
                    setErrors({ name: "", role: "", status: "" });
                    setModalOpen(true);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-400 transition-colors bg-inherit"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#c5c3d5] text-lg text-center bg-inherit">No users found</p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="bg-[#262b34] p-6 sm:p-8 rounded-lg shadow-2xl w-full sm:w-96">
            <h2 className="text-[#c5c3d5] text-lg sm:text-xl mb-4 bg-inherit">
              {isEditing ? "Edit User" : "Add New User"}
            </h2>

            {/* Name Input */}
            <input
              type="text"
              className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                errors.name ? "border-red-500" : "border-[#c5c3d5]"
              } focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
              } transition-all duration-200`}
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => {
                setUserForm({ ...userForm, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.name}</p>
            )}

            {/* Role Selection */}
            <select
              className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                errors.role ? "border-red-500" : "border-[#c5c3d5]"
              } focus:outline-none focus:ring-2 ${
                errors.role ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
              } transition-all duration-200`}
              value={userForm.role}
              onChange={(e) => {
                setUserForm({ ...userForm, role: e.target.value });
                if (errors.role) setErrors({ ...errors, role: "" });
              }}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.role}</p>
            )}

            {/* Status Selection */}
            <select
              className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border ${
                errors.status ? "border-red-500" : "border-[#c5c3d5]"
              } focus:outline-none focus:ring-2 ${
                errors.status ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
              } transition-all duration-200`}
              value={userForm.status}
              onChange={(e) => {
                setUserForm({ ...userForm, status: e.target.value });
                if (errors.status) setErrors({ ...errors, status: "" });
              }}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mb-4 bg-inherit">{errors.status}</p>
            )}

            <div className="flex justify-center mt-4 bg-inherit">
              <button
                className="bg-[#c5c3d5] text-[#262b34] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#b4b2c1] transition-all duration-300"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;
