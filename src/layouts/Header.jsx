import React from "react";

const Header = () => (
  <header className="bg-[#262b34] text-primary p-4 flex justify-between items-center border-b-2 border-secondary">
    <a href="/" className="text-lg text-primary hover:text-[#949fb0] bg-inherit">RBAC</a>
    <nav className="text-primary bg-inherit">
      <a href="/users" className="mr-4 hover:text-[#949fb0] bg-inherit">Users</a>
      <a href="/roles" className="hover:text-[#949fb0] bg-inherit">Roles</a>
    </nav>
  </header>
);

export default Header;
