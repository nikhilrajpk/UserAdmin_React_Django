import axiosInstance from '../axiosInstance'

export const register = async (formData) =>{
    const response = await axiosInstance.post('api/register/', formData, {
        headers : {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}


export const userLogin = async (credential) =>{
    const response = await axiosInstance.post('api/login/', credential, {
        headers: {
            'Content-Type': 'application/json',
          },
    })

    return response.data
}

export const updateProfile = async (userId, formData) =>{
    try{
        const response = await axiosInstance.put(`api/update-profile/${userId}/`, formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data
    }catch(err){
        console.error('Error updating user profile:', err.response?.data || err);
        throw err;
    }
}

export const getAllUser = async () =>{
    try{
        const response = await axiosInstance.get(`api/users/`)

        return response.data
    }catch(error){
        console.error('Error on retrieving users data : ', error.response?.data || error);
        throw error
    }
}

export const getUser = async (userId) =>{
    try{
        const response = axiosInstance.get(`api/users/${userId}/`)
        return response
    }catch(error){
        console.error('Error on retrieving user data : ', error.response?.data || error)
        throw error
    }
}

export const removeUser = async (userId) =>{
    try {
        const response = axiosInstance.delete(`api/users/${userId}/`)
        return response
    } catch (error) {
        console.error('Error on deleting user data : ', error.response?.data || error)
    }
}