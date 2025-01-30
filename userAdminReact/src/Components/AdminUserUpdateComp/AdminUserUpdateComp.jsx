
import { useEffect, useState } from 'react';
import './AdminUserUpdateComp.css'
import Input from '../Input';
import InputValidation from '../InputValidation';
import Button from '../Button';
import { updateProfile } from '../../API/authApi';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../utils/Loader/Loader'
import { getUser } from '../../API/authApi';

function AdminUserUpdateComp() {
    
    const {userId} = useParams()
    const cleanedUserId = userId.replace(':', '')

    const [userData, setUserData] = useState(null)
    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const response = await getUser(cleanedUserId)
                setUserData(response.data)
            } catch (error) {
                console.log('Error during fetching user data :: AdminUserUpdateComp ::', error.response?.data)
            }
        }

        if(cleanedUserId){
            fetchUser()
        }
    },[cleanedUserId])

    const [user, setUser] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        user_profile: "",
    });

    useEffect(() => {
        if (userData) {
            setUser({
                username: userData?.username || "",
                email: userData?.email || "",
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                phone: userData?.phone || "",
                address: userData?.address || "",
                user_profile: userData?.user_profile || "",
            });
        }
    }, [userData]);

    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            await updateProfile(cleanedUserId, formData);
            
            setErrors([]);
            alert('User updated successfully :)')
            navigate('/admin-home')
        } catch (error) {
            const errorResponse = error.response?.data; // Extract error data from response
            
            if (errorResponse) {
                // Map over the errorResponse keys and values to format error messages
                const errorMessages = Object.entries(errorResponse)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join('\n');
            
                console.error('Error during updating user:', errorMessages);
                setErrors(errorMessages.split('\n')); // Set errors as an array of strings
            } else {
                setErrors(['An unexpected error occurred. Please try again later.']);
            }
        }finally{
            setLoading(false)
        }
    };

    return loading ? < Loader /> : (
    <div className='admin_update_container'>
        <div className='admin_update_form_div'>
        {Array.isArray(errors) && errors.length > 0 && (
            <ul style={{ color: 'red' }}>
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
            </ul>
        )}

        <h2>User Signup</h2>

        <form encType="multipart/form-data" onSubmit={submitHandle} className='admin_update_form'>

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

            <img className='admin_update_form_img_preview'
            src={`http://127.0.0.1:8000${userData?.user_profile}`}
            alt={userData?.username} 
            />

            <Button type={'submit'} label={"Edit"} />
        </form>
        </div>
    </div>
    );
}
    

export default AdminUserUpdateComp