import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole, ...rest }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser || loggedInUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
