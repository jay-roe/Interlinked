import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        // user is not authenticated, send to login page
        console.log('user not logged in, redirecting');
        
        return <Navigate to="/login" />;
    }
    return children;
};