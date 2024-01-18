import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ isAuthenticated,
    adminOnly,
    children,
    admin,
    redirect = "/login" }) => {

    if (!isAuthenticated) return <Navigate to={redirect} />

    if (adminOnly && !admin) return <Navigate to="/" />

    return children ? children : <Outlet />
}
export default ProtectedRoute