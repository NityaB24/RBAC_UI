import React from "react";

const Dashboard = () => {


  return (
    <div className="bg-[#c5c3d5] min-h-screen flex flex-col items-center py-12 px-8">
      <div className="text-center mb-12 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-5xl text-[#262b34] font-extrabold mb-4">
          Welcome to the RBAC Dashboard
        </h1>
        <p className="text-lg text-[#4a4a59] mb-6">
          Effortlessly manage users, roles, and permissions in one place.
        </p>
        <a href="/users"
          className="px-8 py-3 bg-[#262b34] text-[#c5c3d5] font-semibold rounded-full shadow-md hover:bg-[#333846] transition-all transform hover:scale-105"
        >
          Get Started
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-screen-lg">
        {/* Users Section */}
        <div
          className="bg-[#262b34] p-8 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center hover:scale-105 cursor-pointer transform"
        >
          <h3 className="text-2xl text-[#c5c3d5] font-semibold mb-4 bg-inherit">Manage Users</h3>
          <p className="text-sm text-[#a1a1aa] mb-6 bg-inherit">
            Add, update, or remove users with intuitive controls.
          </p>
          <a href="/users" className="px-6 py-2 bg-[#4FD1C5] text-white font-medium rounded-md hover:bg-[#38b2ac] transition-all">
            Go to Users
          </a>
        </div>

        {/* Roles Section */}
        <div
          className="bg-[#262b34] p-8 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center hover:scale-105 cursor-pointer transform"
        >
          <h3 className="text-2xl text-[#c5c3d5] font-semibold mb-4 bg-inherit">Manage Roles</h3>
          <p className="text-sm text-[#a1a1aa] mb-6 bg-inherit">
            Customize and assign roles to control feature access.
          </p>
          <a href="/roles" className="px-6 py-2 bg-[#62c865] text-white font-medium rounded-md hover:bg-[#7aa27b] transition-all">
            Go to Roles
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-[#4a4a59] text-sm">
        <p>&copy; 2024 RBAC Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
