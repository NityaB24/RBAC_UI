import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const handleLogout = () => {
    if (loggedInUser && loggedInUser.name) {
      const userIndex = users.findIndex((user) => user.name === loggedInUser.name);

      if (userIndex !== -1) {
        users[userIndex].status = "Inactive";
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const currentUser = users.find((user) => user.name === loggedInUser.name);

  const userRole = currentUser ? currentUser.role : null;
  const currentRole = roles.find((role) => role.name === userRole);
  const userPermissions = currentRole ? currentRole.permissions : [];
  const [userTasks, setUserTasks] = useState(tasks.filter((task) => task.userId === currentUser?.id));

  const handleTaskStatusChange = (taskId) => {
    const updatedTasks = [...userTasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
    const task = updatedTasks[taskIndex];

    if (task && task.status === "Pending") {
      task.status = "Completed";
      task.completedDate = new Date().toLocaleDateString();
      updatedTasks[taskIndex] = task;

      setUserTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-[#262b34] to-[#3e4656] py-10 px-5"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-primary rounded-3xl shadow-xl p-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-extrabold text-[#262b34] mb-2">
            Hello, <span className="text-[#3e4656]">{loggedInUser.name || "Guest"}</span>
          </h1>
          <p className="text-md text-gray-500 mb-4">Welcome back to your dashboard!</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-[#566278] hover:bg-[#262b34] text-white font-semibold py-2 px-6 rounded-full shadow transition-all"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Role and Permissions Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#9bb0d7] to-[#3c4454] p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-[#181b21] mb-4">Your Role</h2>
            {userRole ? (
              <p className="text-lg bg-[#ffffff] text-[#000] font-medium rounded-md px-4 py-2 shadow-sm">
                {userRole}
              </p>
            ) : (
              <div className="bg-red-100 text-red-600 font-semibold rounded-md px-4 py-2 shadow-md">
                Role - Not assigned yet!
              </div>
            )}

            <h3 className="text-xl font-semibold text-[#181b21] mt-6 mb-4">Your Permissions</h3>
            {userPermissions.length > 0 ? (
              <ul className="space-y-2">
                {userPermissions.map((permission, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#f9f9f9] rounded-md px-4 py-2 shadow-md hover:bg-[#eaeaea] transition"
                  >
                    {permission}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="bg-yellow-100 text-yellow-600 font-semibold rounded-md px-4 py-2 shadow-md">
                Permissions - Not assigned yet!
              </div>
            )}
          </motion.div>

          {/* Tasks Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#9bb0d7] to-[#3c4454] p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-[#181b21] mb-4">Your Tasks</h2>
            {userTasks.length > 0 ? (
              <ul className="space-y-4">
                {userTasks.map((task) => (
                  <motion.li
                    key={task.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-[#ffffff] text-[#000] font-medium rounded-md px-4 py-2 shadow-sm hover:bg-[#eaeaea] transition-all"
                  >
                    <h3 className="text-lg font-bold text-[#181b21]">{task.description}</h3>
                    <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                    <p className="text-sm text-gray-600">Status: {task.status}</p>
                    {task.status === "Completed" && (
                      <p className="text-sm text-gray-600">Completed on: {task.completedDate}</p>
                    )}
                    <p className="text-sm text-gray-600">Comments: {task.comments}</p>

                    {task.status === "Pending" && (
                      <div className="flex justify-between items-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTaskStatusChange(task.id)}
                          className="bg-[#404959] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#181b21] transition-all"
                        >
                          Mark as Completed
                        </motion.button>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="bg-white text-black font-semibold rounded-md px-4 py-2 shadow-md">
                Tasks - Not assigned yet!
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;
