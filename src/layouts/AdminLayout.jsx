import React from "react";
import Header from "./Header";

const AdminLayout = ({ children }) => (
  <div data-scroll-container>
    <Header />
    <main className="p-6">{children}</main>
  </div>
);

export default AdminLayout;
