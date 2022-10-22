import { createAsyncThunk } from "@reduxjs/toolkit"
import { Task } from "../../model/task";
import { ApiConstants } from "../../utls/api_constant";
import axios from '../../utls/axios'
import { CreateProjectType, ListType, TaskStateType, TaskSwapType } from "./taskTypes";



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

export const swapTask = createAsyncThunk('task/swap', async ({ dropTaskIndex, dragTaskIndex, type }: TaskSwapType, thunkApi) => {
	let swapList: Task[] = [];
	const state = thunkApi.getState() as { task: TaskStateType, user: any };
	const task = state.task;
	if (type == ListType.pending) {
		swapList = task.pendingTasks;
	}
	else if (type == ListType.today) {
		swapList = task.todayCompleted;
	}
	else {
		swapList = task.previouslyCompletedTask;
	}
	let dragTaskId = swapList[dragTaskIndex]._id;
	let dragTaskOrderId = swapList[dragTaskIndex].orderId;
	let dropTaskId = swapList[dropTaskIndex]._id;
	let dropTaskOrderId = swapList[dropTaskIndex].orderId;
	const res = await axios.post(ApiConstants.swapTask, {
		dragTaskId,
		dragTaskOrderId,
		dropTaskId,
		dropTaskOrderId
	})
})