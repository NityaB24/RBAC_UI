let mockUsers = [
  { id: 1, name: "John", role: "Admin", status: "Active",password:"John@123" },
  { id: 2, name: "Jane", role: "Editor", status: "Inactive",password:"Jane@123" },
];

let mockRoles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Check if there is existing data in localStorage, otherwise set the initial mock data
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(mockUsers));
} else {
  mockUsers = JSON.parse(localStorage.getItem("users"));
}

if (!localStorage.getItem("roles")) {
  localStorage.setItem("roles", JSON.stringify(mockRoles));
} else {
  mockRoles = JSON.parse(localStorage.getItem("roles"));
}

export const mockApi = {
  getUsers: () => Promise.resolve(mockUsers),
  getRoles: () => Promise.resolve(mockRoles),
  saveUsers: (users) => {
    localStorage.setItem("users", JSON.stringify(users));
    mockUsers = users; // Update local mock data
  },
  saveRoles: (roles) => {
    localStorage.setItem("roles", JSON.stringify(roles));
    mockRoles = roles; // Update local mock data
  },
};
