import { createSlice } from "@reduxjs/toolkit";
import { getProfile, loginRequest, registrationRequest } from "./userServices";

const initialState:{
	name:string,
	email:string,
	loading:Boolean,
	error:string|null,
} = {
	name:'',
	email:'',
	loading:false,
	error:null,
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
			state.error = null;
			state.email = action.payload.email;
			state.name = action.payload.name;
		localStorage.setItem('slowbro-token',action.payload.token);
		})
		.addCase(loginRequest.rejected,(state,action)=>{
			state.error = action.error.message??"Something went wrong while sign in";
			state.loading = false;
		})
		.addCase(registrationRequest.pending,(state)=>{
			state.loading = true;
		})
		.addCase(registrationRequest.fulfilled,(state,action)=>{
			state.loading = false;
			state.error = null;
			state.email = action.payload.email;
			state.name = action.payload.name;
			localStorage.setItem('slowbro-token',action.payload.token);
		})
		.addCase(registrationRequest.rejected,(state,action)=>{
			state.loading = false;
			state.error = action.error.message??"Something went wrong while sign up";
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
			state.error = action.error.message??'Something went wrong while fetching profile';
		})

	}
})

export default userSlice.reducer;
export const {logout} = userSlice.actions;

