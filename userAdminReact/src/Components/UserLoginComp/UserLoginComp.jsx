import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
      
            if (data.access && data.refresh) {
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                console.log('User details:', data.userDetails); 
        
                //   storing user data in redux store
                dispatch((login({user : data.userDetails, token : data.access })))
                
                setErrors('')
                alert('Login successful');
                navigate('/');
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
    <div>
        {Array.isArray(errors) && errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
            </ul>
        )}

        <form encType="multipart/form-data" onSubmit={submitHandle} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>

            <Input name="username" type="text" placeholder="Enter the username" onChangeHandle={onChangeHandle} />
            <Input name="password" type="password" placeholder="Enter the password" onChangeHandle={onChangeHandle} />
            
            <Button type="submit" label="Login" />
        </form>
    </div>
  )
}

export default UserLoginComp