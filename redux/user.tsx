import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConstants } from "../utls/api_constant";
import axios from '../utls/axios';


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

 interface loginRequestPropType{
	email:string,
	password:string,
}

 interface registractionRequestPropType {
	name:string,
	email:string,
	password:string,
}

export const loginRequest = createAsyncThunk('user/login',async ({email,password}:loginRequestPropType,thunkApi)=>{
	const res = await axios.post(ApiConstants.loginApi,{
		email,password
	});
	return res.data;
})

export const registrationRequest = createAsyncThunk('user/registration',async ({name,email,password}:registractionRequestPropType)=>{
	const res = await axios.post(ApiConstants.registractionApi,{
		name,email,password
	})
	return res.data;
})

export const getProfile = createAsyncThunk('user/getProfile',async ()=>{
	const res = await axios.get(ApiConstants.getProfileApi);
	return res.data;
})


const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// addTask:(state:any,action:any)=>{

		// }
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
// export const {} = userSlice.actions;

