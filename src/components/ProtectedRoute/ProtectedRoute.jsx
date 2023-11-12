import { Navigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = sessionStorage.getItem('vncuser');
    
    return isAuthenticated ?  <Sidebar>{children}</Sidebar> : <Navigate to="/login" />;
  };

  export default ProtectedRoute;
  