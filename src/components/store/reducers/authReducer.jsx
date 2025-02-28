import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData : null,
    loading:false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

export const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken : (state , action)=>{
            state.token = action.payload
        },
        setSignupData : (state , action)=>{
            state.signupData = action.payload
        },
        setLoading : (state , action)=>{
            state.loading = action.payload
        }
    }
})

export const { setToken , setLoading , setSignupData} = userSlice.actions

export default userSlice.reducer