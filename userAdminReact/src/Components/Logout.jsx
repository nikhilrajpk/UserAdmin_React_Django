import React from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onClickHandle = ()=>{
        dispatch(logout())
        localStorage.removeItem('reduxState')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        alert('Logged out successfully.')
        navigate('/')
    }

  return (
    <div>
        < Button type={'button'} label={'Logout'} onClickHandle={onClickHandle} />
    </div>
  )
}

export default Logout