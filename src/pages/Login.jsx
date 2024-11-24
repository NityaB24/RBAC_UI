import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ADMIN_CREDENTIALS = { name: "admin", password: "admin" };

const Login = () => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const { name, password } = loginData;
    let valid = true;
    let newErrors = { name: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Username is required.";
      valid = false;
    } else if (name.length < 4) {
      newErrors.name = "Username must be at least 4 characters long.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    if (role === "admin") {
      if (name === ADMIN_CREDENTIALS.name && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", name }));
        navigate("/admin-dashboard");
      } else {
        alert("Invalid Admin Credentials");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.name === name && u.password === password);
      if (userIndex !== -1) {
        users[userIndex].status = "Active";
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "user", name }));
        navigate("/user-dashboard");
      } else {
        alert("Invalid User Credentials");
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c5c3d5] via-[#a1a1d5] to-[#6e64d5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#262b34] p-8 rounded-lg shadow-lg max-w-sm w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-3xl font-semibold text-center mb-6 text-indigo-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Login
        </motion.h1>

        <div className="space-y-6">
          {/* Username */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-indigo-300">Username</label>
            <input
              type="text"
              value={loginData.name}
              onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-md bg-[#333642] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </motion.div>

          {/* Password */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-indigo-300">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-md bg-[#333642] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </motion.div>

          {/* Radio buttons for selecting role */}
          <div className="flex items-center space-x-4 mt-4">
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="form-radio text-indigo-500"
              />
              <span className="ml-2">Login as Admin</span>
            </label>
            <label className="inline-flex items-center text-white">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="form-radio text-indigo-300"
              />
              <span className="ml-2">Login as User</span>
            </label>
          </div>

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

        
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
