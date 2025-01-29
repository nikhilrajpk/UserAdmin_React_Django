import React, { useState } from 'react';
import Input from '../Input';
import InputValidation from '../InputValidation';
import Button from '../Button';
import { register } from '../../API/authApi';
import { Link, useNavigate } from 'react-router-dom';


function UserSignupComp() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    phone: '',
    address: '',
    user_profile: undefined,
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState([]);

  const onChangeHandle = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'user_profile') {
      setUser((prevState) => ({ ...prevState, user_profile: files[0] }));
      return;
    }
  
    // Validate the input
    const fieldErrors = InputValidation(name, value);
  
    setErrors((prevErrors) => {
      // Remove all errors related to the current field
      const filteredErrors = prevErrors.filter(
        (error) => !error.toLowerCase().includes(name.toLowerCase())
      );
  
      // Return updated errors, including the new ones
      return [...filteredErrors, ...fieldErrors];
    });
  
    // Update the user's state
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  
  

  const submitHandle = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      setErrors((prev) => [...prev, 'Password mismatch!']);
      return;
    }else {
        setErrors((prev) => prev.filter((err) => err !== 'Password mismatch!'));
    }

    if (errors.length > 0) return;

    const formData = new FormData();
    for (const key in user) {
        if (user[key] !== undefined && user[key] !== null) {
            formData.append(key, user[key]);
        }
    }

    try {
      const response = await register(formData);
      console.log('User registered successfully', response);
      setErrors([]);
      setUser({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        phone: '',
        address: '',
        user_profile: undefined,
      });
      alert('Registered successfully :)')
      navigate('/')
    } catch (error) {
        const errorResponse = error.response?.data; // Extract error data from response
      
        if (errorResponse) {
          // Map over the errorResponse keys and values to format error messages
          const errorMessages = Object.entries(errorResponse)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
      
          console.error('Error during registration:', errorMessages);
          setErrors(errorMessages.split('\n')); // Set errors as an array of strings
        } else {
          setErrors(['An unexpected error occurred. Please try again later.']);
        }
      }
  };

  return (
    <div>
      {Array.isArray(errors) && errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}

      <h2>User Signup</h2>

      <form encType="multipart/form-data" onSubmit={submitHandle} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>

        <Input name="username" type="text" placeholder="Enter the username" onChangeHandle={onChangeHandle} />
        <Input name="email" type="email" placeholder="Enter the email" onChangeHandle={onChangeHandle} />
        <Input name="first_name" type="text" placeholder="Enter the first name" onChangeHandle={onChangeHandle} />
        <Input name="last_name" type="text" placeholder="Enter the last name" onChangeHandle={onChangeHandle} />
        <Input name="password" type="password" placeholder="Enter the password" onChangeHandle={onChangeHandle} />
        <Input name="confirm_password" type="password" placeholder="Confirm password" onChangeHandle={onChangeHandle} />
        <Input name="phone" type="text" placeholder="Enter the phone" onChangeHandle={onChangeHandle} />
        <Input name="address" type="text" placeholder="Enter the address" onChangeHandle={onChangeHandle} />
        <Input
          name="user_profile"
          type="file"
          placeholder="Upload profile picture"
          onChangeHandle={onChangeHandle}
          props={{ accept: '.png,.jpeg,.jpg' }}
        />
        <Button type="submit" label="Register" />
      </form>
      <p>Already have an account?&nbsp; <Link to={'/'} >Login</Link></p>
    </div>
  );
}

export default UserSignupComp;
