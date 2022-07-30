import { useAuth } from '../contexts/AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const { currentUser } = useAuth()
  // if (currentUser?.isEmailVarified) {
  //   return <Outlet />
  // } else if (currentUser) {
  //   return <Outlet />
  // } else {
  //   return <Navigate to="/auth" state={{ from: location }} replace />
  // }
  return currentUser ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />
}

export default ProtectedRoute
