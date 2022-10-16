import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiConstants } from "../../utls/api_constant";
import axios from '../../utls/axios'

interface CreateProjectType {
	name:string,
}

export const createProject = createAsyncThunk('task/newProject',async({name}:CreateProjectType)=>{
	const res =await axios.post(ApiConstants.newProject,{name});
	return res.data.project;
})
