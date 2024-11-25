import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRBAC } from "../contexts/RBACContext";
import Modal from "../components/Modal";
import Header from "../layouts/Header";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Users = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useRBAC();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    role: "",
    status: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    status: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
    exit: { opacity: 0, y: "-100vh" },
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    const newErrors = { name: "", role: "", status: "", password: "" };

    if (!userForm.name.trim()) newErrors.name = "Name is required.";
    if (!userForm.role) newErrors.role = "Role is required.";
    if (!userForm.status) newErrors.status = "Status is required.";
    if (!userForm.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (userForm.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (isEditing) {
      updateUser(userForm); // Make sure updateUser expects the full userForm object.
    } else {
      const newUser = { ...userForm, id: Date.now() };
      addUser(newUser); // Ensure addUser is expecting a user object with id.
    }

    setUserForm({ name: "", role: "", status: "", password: "" });
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
    <>
      <Header />
      <div className="min-h-screen bg-[#c5c3d5] p-4 sm:p-8">
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold text-[#262b34] mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          User Management
        </motion.h1>

        {/* Search input */}
        <motion.input
          type="text"
          className="w-full mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
          placeholder="Search users by name, role, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
        />

        <motion.button
          className="w-full sm:w-auto bg-[#262b34] text-[#c5c3d5] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-[#1f2329] transition-all duration-300 mb-4 sm:mb-6"
          onClick={() => {
            setUserForm({ name: "", role: "", status: "", password: "" });
            setErrors({ name: "", role: "", status: "", password: "" });
            setModalOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Add User
        </motion.button>

        <motion.div
          className="bg-[#262b34] p-4 sm:p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {filteredUsers.length > 0 ? (
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  className="p-4 border-b border-[#c5c3d5] flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#333a42] rounded-lg mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <span className="text-[#c5c3d5] font-medium bg-inherit">
                    {user.name} - {user.role} ({user.status})
                  </span>
                  <div className="mt-2 sm:mt-0 space-x-4 bg-inherit">
                    <motion.button
                      className="text-[#6cfa74] hover:text-[#35ff3f] transition-colors bg-inherit"
                      onClick={() => {
                        setUserForm(user);
                        setErrors({
                          name: "",
                          role: "",
                          status: "",
                          password: "",
                        });
                        setModalOpen(true);
                        setIsEditing(true);
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      className="text-red-500 hover:text-red-400 transition-colors bg-inherit"
                      onClick={() => deleteUser(user.id)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Delete
                    </motion.button>
                    <motion.button
                      className="text-[#4FD1C5] hover:text-[#38b2ac] transition-colors bg-inherit"
                      onClick={() => navigate(`/tasks/${user.id}`)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Tasks
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="text-[#c5c3d5] text-lg text-center bg-inherit">
              No users found
            </p>
          )}
        </motion.div>

        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <motion.div
              className="bg-[#262b34] p-6 sm:p-8 rounded-lg shadow-2xl w-full sm:w-96"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-[#c5c3d5] text-lg sm:text-xl mb-4 bg-inherit">
                {isEditing ? "Edit User" : "Add New User"}
              </h2>
              <label className="text-white">User Name</label>
              <motion.input
                type="text"
                className={`w-full mb-4 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#fff] border ${
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
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">
                  {errors.name}
                </p>
              )}
              <label className="text-white">Select Role</label>
              <motion.select
                className={`w-full mb-4 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#fff] border ${
                  errors.role ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.role ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                value={userForm.role}
                onChange={(e) => {
                  setUserForm({ ...userForm, role: e.target.value });
                  if (errors.role) setErrors({ ...errors, role: "" });
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </motion.select>
              {errors.role && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">
                  {errors.role}
                </p>
              )}
              <label className="text-white">Select Status</label>
              <motion.select
                className={`w-full mb-4 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#fff] border ${
                  errors.status ? "border-red-500" : "border-[#c5c3d5]"
                } focus:outline-none focus:ring-2 ${
                  errors.status ? "focus:ring-red-500" : "focus:ring-[#c5c3d5]"
                } transition-all duration-200`}
                value={userForm.status}
                onChange={(e) => {
                  setUserForm({ ...userForm, status: e.target.value });
                  if (errors.status) setErrors({ ...errors, status: "" });
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </motion.select>
              {errors.status && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">
                  {errors.status}
                </p>
              )}
              <label className="text-white">Password</label>
              <div className="relative">
                <motion.input
                  type={isPasswordVisible ? "text" : "password"}
                  className={`w-full mb-2 p-2 sm:p-3 rounded-lg bg-[#333a42] text-[#fff] border ${
                    errors.password ? "border-red-500" : "border-[#c5c3d5]"
                  } focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-[#c5c3d5]"
                  } transition-all duration-200`}
                  placeholder="Password"
                  value={userForm.password}
                  onChange={(e) => {
                    setUserForm({ ...userForm, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#c5c3d5]"
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-4 bg-inherit">
                  {errors.password}
                </p>
              )}

              <div className="flex justify-center mt-4 bg-inherit">
                <motion.button
                  className="bg-[#c5c3d5] text-[#262b34] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#b4b2c1] transition-all duration-300"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Users;
