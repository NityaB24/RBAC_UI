import React, { createContext, useContext, useState, useEffect } from "react";
import { mockApi } from "../api/mockApi";

const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    setUsers(storedUsers || mockApi.getUsers());
    setRoles(storedRoles || mockApi.getRoles());
  }, []);

  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    mockApi.saveUsers(updatedUsers);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    mockApi.saveUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    mockApi.saveUsers(updatedUsers);
  };

  const addRole = (role) => {
    const updatedRoles = [...roles, role];
    setRoles(updatedRoles);
    mockApi.saveRoles(updatedRoles);
  };

  const updateRole = (updatedRole) => {
    const updatedRoles = roles.map((r) =>
      r.id === updatedRole.id ? updatedRole : r
    );
    setRoles(updatedRoles);
    mockApi.saveRoles(updatedRoles);
  };

  const deleteRole = (id) => {
    const updatedRoles = roles.filter((r) => r.id !== id);
    setRoles(updatedRoles);
    mockApi.saveRoles(updatedRoles);
  };

  return (
    <RBACContext.Provider
      value={{
        users,
        roles,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => useContext(RBACContext);
