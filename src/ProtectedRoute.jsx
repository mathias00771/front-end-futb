import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./context/AuthContext"
import {Navigate, Outlet, useLoaderData} from 'react-router-dom'


const ProtectedRoute = () => {
    const {loading,isAuthenticated} = useAuth();

    if (loading) return ( <LoadingScreen />)
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace/>
  return (
    <Outlet></Outlet>
  )
}

export default ProtectedRoute
