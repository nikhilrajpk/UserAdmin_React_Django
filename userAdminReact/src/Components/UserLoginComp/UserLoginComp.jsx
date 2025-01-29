import React, { useState } from 'react'
import './UserLoginComp.css'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../API/authApi'
import { login } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'
import Input from '../Input'
import Button from '../Button'

function UserLoginComp() {
    const [user, setUser] = useState({
        username : '',
        password : '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState()

    const onChangeHandle = (e) =>{
        const {name, value} = e.target;

        setUser((prev)=> ({...prev, [name] : value }))
    }

    const submitHandle = async (e) =>{
        e.preventDefault()

        try{
            console.log('credentials', user.username, user.password)
      
            const data = await userLogin({
              username : user.username,
              password : user.password,
            })

            // if not admin then only allowing user to userHome.
            if(data.userDetails.is_staff){
                alert('Admin cannot login to the user page :(')
                // need to redirect to admin login.
                
            }
      
            if (data.access && data.refresh) {
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                console.log('User details:', data.userDetails); 
        
                //   storing user data in redux store
                dispatch(login({user : data.userDetails, token : data.access }))
                
                setErrors('')
                alert('Login successful');

                navigate('/user-home');

            } else {
              throw new Error('Tokens missing in response');
            }
          }catch(error){
            const errorResponse = error.response?.data || { detail: 'An error occurred' };
            const errorMessage = Object.values(errorResponse)
            .flat()
            .join(', '); 
      
            console.error('Error during registration:', errorMessage);
            setErrors(errorMessage + ' ' + 'Username or password is incorrect!'); 
          } 
    }

  return (
    <div className='login_container'>
      <div className='login_form_div'>
        {Array.isArray(errors) && errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
            </ul>
        )}

        <h2>User Login</h2>

        <form encType="multipart/form-data" onSubmit={submitHandle} className='login_form'>

            <Input name="username" type="text" placeholder="Enter the username" onChangeHandle={onChangeHandle} />
            <Input name="password" type="password" placeholder="Enter the password" onChangeHandle={onChangeHandle} />
            
            <Button type="submit" label="Login" />
        </form>
        <p>Don&apos;t have an account?&nbsp; <Link to={'/signup'} >Create Account</Link></p>
      </div>
    </div>
  )
}

export default UserLoginComp