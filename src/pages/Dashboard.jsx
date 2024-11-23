import React from "react";
import Header from "../layouts/Header";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="bg-[#c5c3d5] min-h-screen flex flex-col items-center py-12 px-8">
        <motion.div 
          className="text-center mb-12" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        >
          <h1 className="text-5xl text-[#262b34] font-extrabold mb-4">
            Welcome to the RBAC Dashboard
          </h1>
          <p className="text-lg text-[#4a4a59] mb-6">
            Effortlessly manage users, roles, and permissions in one place.
          </p>
          <motion.a 
            href="/users" 
            className="px-8 py-3 bg-[#262b34] text-[#c5c3d5] font-semibold rounded-full shadow-md hover:bg-[#333846] transition-all transform"
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Get Started
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-screen-lg">
          <motion.div
            className="bg-[#262b34] p-8 rounded-xl shadow-md flex flex-col items-center text-center transform"
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h3 className="text-2xl text-[#c5c3d5] font-semibold mb-4">Manage Users</h3>
            <p className="text-sm text-[#a1a1aa] mb-6">
              Add, update, or remove users with intuitive controls.
            </p>
            <motion.a 
              href="/users" 
              className="px-6 py-2 bg-[#4FD1C5] text-white font-medium rounded-md hover:bg-[#38b2ac] transition-all"
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.3 }}
            >
              Go to Users
            </motion.a>
          </motion.div>

          <motion.div
            className="bg-[#262b34] p-8 rounded-xl shadow-md flex flex-col items-center text-center transform"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h3 className="text-2xl text-[#c5c3d5] font-semibold mb-4">Manage Roles</h3>
            <p className="text-sm text-[#a1a1aa] mb-6">
              Customize and assign roles to control feature access.
            </p>
            <motion.a 
              href="/roles" 
              className="px-6 py-2 bg-[#62c865] text-white font-medium rounded-md hover:bg-[#7aa27b] transition-all"
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.3 }}
            >
              Go to Roles
            </motion.a>
          </motion.div>
        </div>

        <motion.footer 
          className="mt-16 text-center text-[#4a4a59] text-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <p>&copy; 2024 RBAC Dashboard. All Rights Reserved.</p>
        </motion.footer>
      </div>
    </>
  );
};

export default Dashboard;
