import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children, authentication=true}) {
    const navigate = useNavigate()

    const {isAuthenticated, user} = useSelector((state) => state.user)
    useEffect(()=>{

        // navigate to login page is not authenticated
        if (authentication && !isAuthenticated){
            navigate('/')
        }else if (!authentication && isAuthenticated){
            if(user?.is_staff){
                navigate('/admin-home')
            }else{
                navigate('/user-home')
            }
        }
    }, [navigate, isAuthenticated, authentication, user])

    return children
}

export default ProtectedRoute