import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

export const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        // user is not authenticated, send to login page
        alert('You must be logged in to access this page, redirecting.');
        
        return <Navigate to="/login" />;
    }
    return children;
};