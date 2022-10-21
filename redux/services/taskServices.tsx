import { createAsyncThunk } from "@reduxjs/toolkit"
import { Task } from "../../model/task";
import { ApiConstants } from "../../utls/api_constant";
import axios from '../../utls/axios'

interface CreateProjectType {
	name: string,
}

export const createProject = createAsyncThunk('task/newProject', async ({ name }: CreateProjectType) => {
	const res = await axios.post(ApiConstants.newProject, { name });
	return res.data.data;
})

export const getAllProject = createAsyncThunk('task/allProject', async () => {
	const res = await axios.get(ApiConstants.getAllProject);
	return res.data.data;
})

export const getAllPendingTask = createAsyncThunk('task/allPendingTask', async () => {
	const res = await axios.get(ApiConstants.getAllPendingTask);
	return res.data.data;
})



export const createTask = createAsyncThunk('task/newTask', async (task: Task) => {
	const res = await axios.post(ApiConstants.newTask, { ...task });
	return res.data.data;
})

export const updateTask = createAsyncThunk('task/updateTask', async (task: Task) => {
	const res = await axios.post(ApiConstants.updateTask, {
		...task
	});
	return res.data.data;
})

