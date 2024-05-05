import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './auth';

interface AuthWrapperProps {
    children: ReactNode;
    allowedRoles: string[];
}

const AuthWrapper = ({ children, allowedRoles }: AuthWrapperProps) => {
    const { auth } = useContext<any>(AuthContext);

    const userHasRequiredRole = auth.role && allowedRoles.includes(auth.role);
    const isAuthenticated = auth.loggedIn && userHasRequiredRole;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthWrapper;