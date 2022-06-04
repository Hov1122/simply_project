import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { authSelector } from "../../state-management/auth/selectors"

const RequireAuth = () => {
    const { token } = useSelector(authSelector);
    const location = useLocation();

    return (
        token
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
}
export default RequireAuth