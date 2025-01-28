import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    user : null,
    token : null,
    isAuthenticated : false,
}


export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        login : (state, action) =>{
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },

        logout : (state) =>{
            state.user = null
            state.token = null
            state.isAuthenticated = false
        }
    }
})


export const {login, logout} = userSlice.actions

export default userSlice.reducer