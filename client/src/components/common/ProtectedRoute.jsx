import { Navigate } from 'react-router-dom'
import { useAuthentication } from '@/context/AuthenticationContext'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuthentication();

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator while checking authentication
    }
    
    console.log(isAuthenticated)

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute

