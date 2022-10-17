import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiConstants } from "../../utls/api_constant";
import axios from '../../utls/axios'

interface CreateProjectType {
	name:string,
}

export const createProject = createAsyncThunk('task/newProject',async({name}:CreateProjectType)=>{
	const res =await axios.post(ApiConstants.newProject,{name});
	return res.data.data;
})

export const getAllProject = createAsyncThunk('task/allProject',async()=>{
	const res = await axios.get(ApiConstants.getAllProject);
	return res.data.data;
})

export const getAllTask = createAsyncThunk('task/allTask',async()=>{
	const res = await axios.get(ApiConstants.getAllTask);
	return res.data.data;
})