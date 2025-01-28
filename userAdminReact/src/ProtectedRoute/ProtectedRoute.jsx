import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.isAuthenticated)
    useEffect(()=>{

        // navigate to login page is not authenticated
        if (!isAuthenticated){
            navigate('/')
        }
    }, [navigate, isAuthenticated])

    return children
}

export default ProtectedRoute