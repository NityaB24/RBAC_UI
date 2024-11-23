import React from "react";
import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <header className="bg-[#262b34] text-primary p-4 flex justify-between items-center border-b-2 border-secondary">
      <a href="/admin-dashboard" className="text-lg text-primary hover:text-[#949fb0] bg-inherit">
        RBAC
      </a>
      <nav className="text-primary bg-inherit">
        <a href="/users" className="mr-4 hover:text-[#949fb0] bg-inherit">Users</a>
        <a href="/roles" className="hover:text-[#949fb0] bg-inherit">Roles</a>
        <a href="/tasks" className="ml-4 hover:text-[#949fb0] bg-inherit">Tasks</a>
        <a
          href=""
          onClick={handleLogout}
          className="ml-4 hover:text-[#c9473b] bg-inherit"
        >
          Logout
        </a>
      </nav>
    </header>
  );
};

export default Header;
