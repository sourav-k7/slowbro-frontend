import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequestPropType, registractionRequestPropType } from "./userTypes";
import axios from '../../utls/axios';
import { ApiConstants } from "../../utls/api_constant";

export const loginRequest = createAsyncThunk<{ email: string, name: string, token: string }, loginRequestPropType,
	{
		rejectValue: { message: string }
	}>('user/login', async ({ email, password }, thunkApi) => {
		try {
			const res = await axios.post(ApiConstants.loginApi, {
				email, password
			});
			return res.data;

		} catch (err:any) {
				return thunkApi.rejectWithValue(err.response.data);
		}
	})

export const registrationRequest = createAsyncThunk('user/registration', async ({ name, email, password }: registractionRequestPropType) => {
	const res = await axios.post(ApiConstants.registractionApi, {
		name, email, password
	})

	return res.data;
})

export const getProfile = createAsyncThunk('user/getProfile', async () => {
	const res = await axios.get(ApiConstants.getProfileApi);
	return res.data;
})