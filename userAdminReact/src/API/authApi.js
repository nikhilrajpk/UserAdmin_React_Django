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