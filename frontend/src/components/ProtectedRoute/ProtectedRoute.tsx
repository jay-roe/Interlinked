import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const user = useAuth().currentUser;
    if (!user) {
        // user is not authenticated, send to login page
        return <Navigate to="/login" />;
    }
    return children;
};