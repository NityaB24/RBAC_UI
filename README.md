
# Role-Based Access Control (RBAC) System

A fully functional and responsive Role-Based Access Control (RBAC) system built with React.js, providing a secure and intuitive interface for administrators to manage users, roles, and permissions. The application uses localStorage to persist data, ensuring continuity across sessions.

## Features

### User Management
- **Add Users**: Create new users by specifying their name, assigning a role, and setting their status (Active/Inactive).
- **Edit Users**: Update existing user details, including role and status.
- **Delete Users**: Remove users from the system.
- **Search Users**: Quickly find users by their name or other attributes.

### Role Management
- **Add Roles**: Create roles with unique names and assign permissions (e.g., Read, Write, Delete).
- **Edit Roles**: Update role names or modify assigned permissions.
- **Delete Roles**: Remove roles from the system.
- **Search Roles**: Find roles based on their name or associated permissions.

### Dashboard
- Overview of users and roles with quick actions to manage them.
- Intuitive navigation for seamless interaction with the system.

### Persistent Storage
- **LocalStorage Integration**: Users and roles data is stored in localStorage, ensuring that data is retained even after the browser is refreshed.

### Responsiveness
- Optimized for all devices, including desktops, tablets, and smartphones, ensuring a smooth user experience across screen sizes.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS (optional styling framework for responsive design)
- **State Management**: React Context or useState (for simplicity)
- **Storage**: localStorage (for persistence)

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NityaB24/RBAC_UI.git
   cd RBAC_UI
   ```

2. **Install Dependencies**
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the application on `http://localhost:3000`.

4. **Build for Production**
   To build the app for production:
   ```bash
   npm run build
   ```

## Usage

### Adding Users
1. Navigate to the "Users" section from the sidebar/dashboard.
2. Click the "Add User" button.
3. Fill out the form with the user's name, role, and status, then click "Submit."

### Managing Users
- **Edit**: Use the "Edit" button next to a user's name to modify their details.
- **Delete**: Click the "Delete" button to remove a user.
- **Search**: Use the search bar to filter the list of users.

### Adding Roles
1. Go to the "Roles" section.
2. Click the "Add Role" button.
3. Enter the role's name and assign permissions (e.g., Read, Write, Delete), then save.

### Managing Roles
- **Edit**: Modify role names or permissions by clicking "Edit."
- **Delete**: Remove a role using the "Delete" button.
- **Search**: Quickly find a role using the search feature.

## Folder Structure

```
src/
├── components/        # Reusable components (e.g., Modal)
├── pages/             # Pages for Users, Roles, Dashboard
├── layouts/           # Admin Layout
├── contexts/          # Context API for state management
├── mock/              # Mock API functions
└── App.jsx             # Main app component
```

## Security Measures
- Input validation for all forms to prevent invalid data submission.
- Error handling for user-friendly feedback in case of issues.
- Client-side security with React best practices.

## Future Enhancements
- **Sorting and Filtering**: Add advanced options for sorting users and roles by attributes.
- **Authentication**: Secure the admin dashboard with user authentication.
- **Export/Import Data**: Enable exporting and importing users/roles for backup and restore.

## Screenshots

- **Dashboard**: ![Dashboard](<dashboard.png>)
- **User Management**: ![User](<user.png>)
- **Role Management**: ![Role](<roles.png>)

## Live Demo
[Live Demo Link](https://your-deployment-link.com)

## License
This project is licensed under the MIT License.
