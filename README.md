# Role-Based Access Control (RBAC) System  

A fully functional and responsive Role-Based Access Control (RBAC) system built with React.js, providing secure and intuitive interfaces for administrators and users. This system includes login and signup functionalities, task assignment, and robust management of users, roles, and permissions.  

## Live Demo  
[RBAC](https://rbac-ui-12.vercel.app)  

## Features  

### **Authentication**  
- **Admin Login**: Pre-set admin credentials to secure access to administrative functionalities.  
  - **Username**: `admin`  
  - **Password**: `admin`  
- **User Login**: Users must first sign up with valid credentials and then log in.  
- **Signup Functionality**: Users can register their accounts using a simple signup form.  

### **Admin Functionalities**  
- **User Management**:  
  - Add users by specifying their name, role, and status.  
  - Edit user details, including their role and status.  
  - Delete users from the system.  
  - Assign tasks to users and manage task details.  
  - Search users using the search bar for quick filtering.  

- **Role Management**:  
  - Add roles with specific permissions (e.g., Read, Write, Delete).  
  - Edit role details, including permissions.  
  - Delete roles as needed.  
  - Search and filter roles by name or associated permissions.  

- **Task Management**:  
  - Create and assign tasks to users.  
  - Edit task details, such as descriptions and deadlines.  
  - Delete tasks.  
  - Filter tasks based on criteria like user, status, or priority.  

### **User Functionalities**  
- **View Tasks**:  
  - Users can view the tasks assigned to them by the admin.  
- **Role Information**:  
  - Users can see their roles and permissions assigned by the admin.  

### **Dashboard**  
- Unified interface for managing users, roles, and tasks.  
- Quick actions to create, edit, delete, and filter records.  
- Responsive layout ensuring seamless navigation on all devices.  

### **Persistent Storage**  
- **LocalStorage Integration**: Users, roles, and tasks are stored in localStorage, allowing data to persist across browser sessions.  

### **Responsiveness**  
- Optimized for desktops, tablets, and smartphones for a consistent user experience across screen sizes.  

## Technologies Used  
- **Frontend**: React.js, Tailwind CSS (optional styling framework for responsive design)  
- **State Management**: React Context API and `useState`  
- **Storage**: LocalStorage  

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
   npm start  
   ```  
   This will start the application on `http://localhost:3000`.  

4. **Build for Production**  
   To build the app for production:  
   ```bash  
   npm run build  
   ```  

## Usage  

### **Admin Actions**  
1. **Login**: Use the admin credentials provided above.  
2. **User Management**:  
   - Navigate to the "Users" section to add, edit, delete, or search for users.  
   - Assign roles and tasks to users.  
3. **Role Management**:  
   - Manage roles via the "Roles" section.  
   - Create new roles or modify existing ones.  
4. **Task Management**:  
   - Navigate to "Tasks" to create, assign, or delete tasks.  
   - Use filters to organize and prioritize tasks.  

### **User Actions**  
1. **Signup**: Register an account using the "Signup" page.  
2. **Login**: Log in using the credentials created during signup.  
3. **View Tasks**: Access the tasks assigned by the admin in the "User Dashboard."  

## Folder Structure  

```
src/  
├── components/        # Reusable components (e.g., Modal, Filters)  
├── pages/             # Pages for Login, Signup, Admin and User Dashboards  
├── layouts/           # Admin Layout for navigation and structure  
├── contexts/          # Context API for state management  
├── mock/              # Mock API functions (for localStorage interactions)  
└── App.jsx            # Main app component  
```  

## Security Measures  
- Predefined admin credentials to prevent unauthorized access.  
- Validation for all input fields to prevent invalid or malicious data.  
- Error handling to provide user-friendly feedback for any issues.  

## Future Enhancements  
- **Sorting and Filtering**: Expand advanced filtering and sorting options for tasks and users.  
- **Authentication Enhancements**: Add password recovery and account lockout mechanisms.  
- **Export/Import Data**: Enable data backup and restore functionality.  
- **Notifications**: Notify users about new tasks or updates via email or in-app alerts.  

## Screenshots  
- **Admin Dashboard**: ![Admin Dashboard](<dashboard-1.png>)  
- **Role Management**: ![Role Dashboard](<role.png>)  
- **Task Management**: ![Task Dashboard](<task.png>)  
- **User Management**: ![User Dashboard](<user-1.png>) 
- **User Dashboard**: ![User Dashboard](<user_dashboard.png>)  

## License  
This project is licensed under the MIT License.  