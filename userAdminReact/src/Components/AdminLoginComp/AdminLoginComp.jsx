import React, { useState } from 'react'
import './AdminLoginComp.css'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../API/authApi'
import { login } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'
import Input from '../Input'
import Button from '../Button'
import Loader from '../../utils/Loader/Loader'

function AdminLoginComp() {
    const [user, setUser] = useState({
        username : '',
        password : '',
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState('')

    const onChangeHandle = (e) =>{
        const {name, value} = e.target;

        setUser((prev)=> ({...prev, [name] : value }))
    }

    const submitHandle = async (e) =>{
        e.preventDefault()

        try{
            setLoading(true)
            console.log('credentials', user.username, user.password)
      
            const data = await userLogin({
              username : user.username,
              password : user.password,
            })

            // if not admin then only allowing user to userHome.
            if(!data.userDetails.is_staff){
                alert('User cannot login to the admin page :(')
                return
            }
      
            if (data.access && data.refresh) {
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                console.log('Admin details:', data.userDetails); 
        
                //   storing user data in redux store
                dispatch(login({user : data.userDetails, token : data.access }))
                
                setErrors('')
                alert('Admin login successful');

                navigate('/admin-home');

            } else {
              throw new Error('Tokens missing in response');
            }
          }catch(error){
            const errorResponse = error.response?.data || { detail: 'An error occurred' };
            const errorMessage = Object.values(errorResponse)
            .flat()
            .join(', '); 
      
            console.error('Error during registration:', errorMessage);
            setErrors([errorMessage + ' ' + 'Username or password is incorrect!']); 
          }finally{
            setLoading(false)
          } 
    }

  return loading ? < Loader /> : (
    <div className='admin_login_container'>
      <div className='admin_login_form_div'>
        {Array.isArray(errors) && errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
            </ul>
        )}

        <h2>Admin Login</h2>

        <form encType="multipart/form-data" onSubmit={submitHandle} className='admin_login_form'>

            <Input value={user.username} name="username" type="text" placeholder="Enter the username" onChangeHandle={onChangeHandle} />
            <Input name="password" type="password" placeholder="Enter the password" onChangeHandle={onChangeHandle} />
            
            <Button type="submit" label="Login" />
        </form>
        <p>Not an admin?&nbsp; <Link to={'/'} >User Login</Link></p>
      </div>
    </div>
  )
}

export default AdminLoginComp