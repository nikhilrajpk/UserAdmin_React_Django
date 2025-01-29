import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children, authentication=true}) {
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    useEffect(()=>{

        // navigate to login page is not authenticated
        if (authentication && !isAuthenticated){
            navigate('/')
        }else if (!authentication && isAuthenticated){
            navigate('/user-home')
        }
    }, [navigate, isAuthenticated, authentication])

    return children
}

export default ProtectedRoute