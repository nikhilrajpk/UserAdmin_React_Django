
import React, { useState } from 'react';
import './UserProfileUpdateComp.css'
import Input from '../Input';
import InputValidation from '../InputValidation';
import Button from '../Button';
import { updateProfile } from '../../API/authApi';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { login } from '../../slices/userSlice';

function UserProfileUpdateComp() {
    const userData = useSelector((state)=> state.user.user)
    const token = useSelector((state)=> state.user.token)
    const dispatch = useDispatch()

    const [user, setUser] = useState({
    username: userData?.username,
    email: userData?.email,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    phone: userData?.phone,
    address: userData?.address,
    user_profile: userData?.user_profile,
    });

    const navigate = useNavigate()

    const [errors, setErrors] = useState([]);

    const onChangeHandle = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'user_profile' && files.length > 0) {
        setUser((prevState) => ({
            ...prevState,
            user_profile: files[0], 
        }));
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

        if (errors.length > 0) return;

        const formData = new FormData();
        for (const key in user) {
            if (key === "user_profile") {
                if (user.user_profile instanceof File) {
                    formData.append(key, user.user_profile);
                }
            } else if (user[key] !== undefined && user[key] !== null) {
                formData.append(key, user[key]);
            }
        }

        try {
            const response = await updateProfile(userData.id, formData);
            
            setErrors([]);
            alert('Profile updated successfully :)')
            dispatch(login({user: response, token : token}))
            navigate('/user-profile')
        } catch (error) {
            const errorResponse = error.response?.data; // Extract error data from response
            
            if (errorResponse) {
                // Map over the errorResponse keys and values to format error messages
                const errorMessages = Object.entries(errorResponse)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join('\n');
            
                console.error('Error during updating profile:', errorMessages);
                setErrors(errorMessages.split('\n')); // Set errors as an array of strings
            } else {
                setErrors(['An unexpected error occurred. Please try again later.']);
            }
        }
    };

    return (
    <div className='update_container'>
        <div className='update_form_div'>
        {Array.isArray(errors) && errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
            </ul>
        )}

        <h2>User Signup</h2>

        <form encType="multipart/form-data" onSubmit={submitHandle} className='update_form'>

            <Input value={user?.username} name="username" type="text" placeholder="Enter the username" onChangeHandle={onChangeHandle} />
            <Input value={user?.email} name="email" type="email" placeholder="Enter the email" onChangeHandle={onChangeHandle} />
            <Input value={user?.first_name} name="first_name" type="text" placeholder="Enter the first name" onChangeHandle={onChangeHandle} />
            <Input value={user?.last_name} name="last_name" type="text" placeholder="Enter the last name" onChangeHandle={onChangeHandle} />
            <Input value={user?.phone} name="phone" type="text" placeholder="Enter the phone" onChangeHandle={onChangeHandle} />
            <Input value={user?.address} name="address" type="text" placeholder="Enter the address" onChangeHandle={onChangeHandle} />

            <Input
            name="user_profile"
            type="file"
            placeholder="Upload profile picture"
            onChangeHandle={onChangeHandle}
            props={{ accept: '.png,.jpeg,.jpg' }}
            isRequired={false}
            />

            <img className='update_form_img_preview'
            src={`http://127.0.0.1:8000${userData?.user_profile}`}
            alt={userData?.username} 
            />

            <Button type="submit" label="Register" />
        </form>
        </div>
    </div>
    );
}
    

export default UserProfileUpdateComp