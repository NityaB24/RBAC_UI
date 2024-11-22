import React, { useState, useEffect } from "react";
import { useRBAC } from "../contexts/RBACContext";
import Modal from "../components/Modal";

const Roles = () => {
  const { roles, addRole, updateRole, deleteRole } = useRBAC();
  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState({ name: "", permissions: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [customPermission, setCustomPermission] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const permissionsList = ["Read", "Write", "Delete"];

  useEffect(() => {
    if (isEditing) {
      const customPerms = role.permissions.filter(
        (perm) => !permissionsList.includes(perm)
      );
      setCustomPermission(customPerms.length > 0 ? customPerms[0] : "");
    }
  }, [isEditing, role]);

  const handleSaveRole = () => {
    if (!role.name.trim()) {
      setError("Role name is required");
      return;
    }

    if (isEditing) {
      updateRole(role);
    } else {
      addRole({ ...role, id: Date.now() });
    }
    setModalOpen(false);
    setRole({ name: "", permissions: [] });
    setCustomPermission("");
    setError("");
  };

  const togglePermission = (permission) => {
    setRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleAddCustomPermission = () => {
    if (
      customPermission.trim() &&
      !role.permissions.includes(customPermission.trim())
    ) {
      setRole((prev) => ({
        ...prev,
        permissions: [...prev.permissions, customPermission.trim()],
      }));
      setCustomPermission("");
    }
  };


  const filteredRoles = roles.filter((role) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      role.name.toLowerCase().includes(searchLower) ||
      role.permissions.some((perm) => perm.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#c5c3d5] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#262b34] mb-6 md:mb-8">
        Roles Management
      </h1>

      {/* Search Input */}
      <input
        type="text"
        className="w-full p-3 mb-6 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
        placeholder="Search roles by name or permission"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add Role Button */}
      <button
        className="w-full sm:w-auto bg-[#262b34] text-[#c5c3d5] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-[#1f2329] transition-all duration-300 mb-4 sm:mb-6"
        onClick={() => {
          setIsEditing(false);
          setRole({ name: "", permissions: [] });
          setModalOpen(true);
        }}
      >
        Add Role
      </button>

      <div className="bg-[#1f2329] p-4 md:p-6 rounded-xl shadow-xl">
        {filteredRoles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-inherit">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-3 bg-[#333a42] rounded-lg flex justify-between items-center shadow border-[#c5c3d5]"
              >
                <div className="bg-inherit">
                  <h2 className="text-base md:text-lg font-semibold text-[#c5c3d5] bg-inherit">
                    {role.name}
                  </h2>
                  <p className="text-sm text-[#9896a1] bg-inherit">
                    Permissions: {role.permissions.join(", ")}
                  </p>
                </div>
                <div className="flex space-x-2 md:space-x-3 bg-inherit">
                  <button
                    className="text-[#c5c3d5] hover:text-[#9896a1] transition-colors bg-inherit"
                    onClick={() => {
                      setIsEditing(true);
                      setRole(role);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400 transition-colors bg-inherit"
                    onClick={() => deleteRole(role.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#c5c3d5] text-lg text-center bg-inherit">
            No roles found
          </p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="bg-[#262b34] p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-[95%] md:max-w-md">
            <h2 className="text-[#c5c3d5] text-xl md:text-2xl mb-6 bg-inherit">
              {isEditing ? "Edit Role" : "Add New Role"}
            </h2>
            <input
              type="text"
              className="w-full p-3 mb-4 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5] transition-all duration-200"
              placeholder="Role Name"
              value={role.name}
              onChange={(e) => setRole({ ...role, name: e.target.value })}
            />
            {error && (
              <div className="text-red-500 text-sm mb-2 bg-inherit">{error}</div>
            )}

            {/* Permissions Section */}
            <div className="mb-6 bg-inherit">
              <h3 className="text-[#c5c3d5] text-lg mb-4 bg-inherit">Permissions</h3>
              <div className="grid grid-cols-2 gap-2 bg-inherit">
                {permissionsList.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2 bg-inherit">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 text-[#c5c3d5] bg-[#333a42] border border-[#c5c3d5] rounded focus:ring-2 focus:ring-[#c5c3d5]"
                    />
                    <span className="text-[#c5c3d5] bg-inherit">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Permissions Section */}
            <div className="bg-inherit">
              <h3 className="text-[#c5c3d5] text-lg mb-4 bg-inherit">Custom Permissions</h3>
              <div className="flex items-center space-x-2 bg-inherit">
                <input
                  type="text"
                  className="flex-1 p-3 rounded-lg bg-[#333a42] text-[#c5c3d5] border border-[#c5c3d5] focus:outline-none focus:ring-2 focus:ring-[#c5c3d5]"
                  placeholder="Custom Permission"
                  value={customPermission}
                  onChange={(e) => setCustomPermission(e.target.value)}
                />
                <button
                  className="bg-[#c5c3d5] text-[#262b34] px-4 py-2 rounded-lg hover:bg-[#b4b2c1] transition-all"
                  onClick={handleAddCustomPermission}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-center bg-inherit">
              <button
                className="bg-[#c5c3d5] text-[#262b34] px-6 py-3 rounded-lg hover:bg-[#b4b2c1] transition-all mr-2"
                onClick={handleSaveRole}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-all"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Roles;
