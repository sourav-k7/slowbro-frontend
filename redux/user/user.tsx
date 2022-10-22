import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getProfile, loginRequest, registrationRequest } from "./userServices";

const initialState:{
	name:string,
	email:string,
	loading:Boolean,
} = {
	name:'',
	email:'',
	loading:false,
}

//! add all new variable to logout reducer
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		logout:(state)=>{
			state.name = '';
			state.email = '';
		},
	},
	extraReducers:builder =>{
		builder
		.addCase(loginRequest.pending,(state)=>{
			state.loading = true;
		})
		.addCase(loginRequest.fulfilled,(state,action)=>{
			state.loading = false;
			state.email = action.payload.email;
			state.name = action.payload.name;
		localStorage.setItem('slowbro-token',action.payload.token);
		})
		.addCase(loginRequest.rejected,(state,action)=>{
			toast.error(action.error.message??"Something went wrong while sign in");
			state.loading = false;
		})
		.addCase(registrationRequest.pending,(state)=>{
			state.loading = true;
		})
		.addCase(registrationRequest.fulfilled,(state,action)=>{
			state.loading = false;
		
			state.email = action.payload.email;
			state.name = action.payload.name;
			localStorage.setItem('slowbro-token',action.payload.token);
		})
		.addCase(registrationRequest.rejected,(state,action)=>{
			state.loading = false;
			toast.error(action.error.message??"Something went wrong while sign up");
		})
		.addCase(getProfile.pending,(state)=>{
			state.loading = true;
		})
		.addCase(getProfile.fulfilled,(state,action)=>{
			state.loading = false;
			state.email = action.payload.email;
			state.name = action.payload.name;
		})
		.addCase(getProfile.rejected,(state,action)=>{
			state.loading = false;
			toast.error(action.error.message??'Something went wrong while fetching profile');
		})

	}
})

export default userSlice.reducer;
export const {logout} = userSlice.actions;

