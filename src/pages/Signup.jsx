import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    const { name, password } = signupData;
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

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.name === name);

    if (userExists) {
      alert("Username already exists!");
    } else {
      const highestId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
      users.push({ ...signupData, status: "Active", id: highestId + 1 });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup Successful! Please Login.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c5c3d5]">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center mb-6 text-primary">Signup</h1>

        <div className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-primary">Username</label>
            <input
              type="text"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your username"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-primary">Password</label>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Signup
          </button>
        </div>

        {/* Link to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-primary">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-indigo-400 hover:text-indigo-500 font-semibold"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
