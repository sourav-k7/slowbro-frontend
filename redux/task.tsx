import {  createSlice } from "@reduxjs/toolkit";
import { Project } from "../model/project";
import { Task } from "../model/task";
import { createProject, getAllProject, getAllTask } from "./services/taskServices";


export interface TaskStateType {
	tasks:Task[],
	projects:Project[],
	loading:Boolean,
	error:String|null,
}

//! reset all new variable to logout reducer
const initialState: TaskStateType = {
	tasks:[],
	projects:[],
	loading:false,
	error:null,
}


const taskSlice = createSlice({
	name:'task',
	initialState,
	reducers:{
		addTask:(state:any,action:any)=>{

		},
	},
	extraReducers: builder=>{
		builder
		.addCase('user/logout',(state)=>{
			state.tasks = [];
			state.projects = [];
		})
		.addCase(createProject.pending,(state)=>{
			state.loading = true;
		})
		.addCase(createProject.fulfilled,(state,action)=>{
			state.loading = false;
			state.projects.push(action.payload);
		})
		.addCase(createProject.rejected,(state,action)=>{
			state.loading = false;
			state.error = action.error.message ?? "Something went wrong while creating project";
		})
		.addCase(getAllProject.pending,(state)=>{
			state.loading = true;
		})
		.addCase(getAllProject.fulfilled,(state,action)=>{
			state.loading = false;
			state.projects=action.payload;
		})
		.addCase(getAllProject.rejected,(state,action)=>{
			state.loading = false;
			state.error = action.error.message??"Something went wrong while fetching all projects";
		})
		.addCase(getAllTask.pending,(state)=>{
			state.loading = true;
		})
		.addCase(getAllTask.fulfilled,(state,action)=>{
			state.loading = false;
			state.tasks = action.payload;
		})
		.addCase(getAllTask.rejected,(state,action)=>{
			state.loading = false;
			state.error = action.error.message ?? "Something went wrong while fetching all tasks";
		})
	}
})

export default taskSlice.reducer;
export const {addTask} = taskSlice.actions;

