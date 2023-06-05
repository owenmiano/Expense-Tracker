import { Navigate, Outlet} from 'react-router-dom'
import { useLocation} from 'react-router'
const PrivateRoutes = ({user}) => {
    const location=useLocation()
    const Token = user?.token;
return (
    Token ? <Outlet/> : <Navigate to='/login' replace state={{from:location}}/>
  )
}


export default PrivateRoutes