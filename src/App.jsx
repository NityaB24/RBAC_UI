import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import PrivateRoute from "./components/PrivateRoute";
import Tasks from "./pages/Tasks";
import Alltasks from "./pages/Alltasks";
import Loader from "./LoadingPage/Logo/Loader";

const App = () => {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("loaderDisplayed")
  );

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loaderDisplayed", "true"); 
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute requiredRole="user" element={<UserDashboard />}/>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin" element={<AdminDashboard />}/>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute requiredRole="admin" element={<Users />}/>
          }
        />
        <Route
          path="/roles"
          element={
            <PrivateRoute requiredRole="admin" element={<Roles />}/>
          }
        />
        <Route
          path="/tasks/:userId"
          element={
            <PrivateRoute requiredRole="admin" element={<Tasks />}/>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute requiredRole="admin" element={<Alltasks />}/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
