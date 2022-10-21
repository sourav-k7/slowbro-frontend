import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../model/project";
import { Task } from "../model/task";
import { createProject, createTask, getAllPendingTask, getAllProject, updateTask } from "./services/taskServices";


export interface TaskStateType {
	tasks: Task[],
	projects: Project[],
	loading: Boolean,
	error: String | null,
}

//! reset all new variable to logout reducer
const initialState: TaskStateType = {
	tasks: [],
	projects: [],
	loading: false,
	error: null,
}


const taskSlice:any = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask: (state: any, action: any) => {

		},
	},
	extraReducers: builder => {
		builder
			.addCase('user/logout', (state) => {
				state.tasks = [];
				state.projects = [];
			})
			.addCase(createProject.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
				state.projects.push(action.payload);
			})
			.addCase(createProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while creating project";
			})
			.addCase(getAllProject.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllProject.fulfilled, (state, action) => {
				state.loading = false;
				state.projects = action.payload;
			})
			.addCase(getAllProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while fetching all projects";
			})
			.addCase(getAllPendingTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllPendingTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(getAllPendingTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while fetching all tasks";
			})
			.addCase(createTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks.push(action.payload);
			})
			.addCase(createTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while creating new project";
			})
			.addCase(updateTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = state.tasks.map(tk => {
					if (tk._id == action.payload._id) {
						return action.payload;
					}
					return tk;
				})
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while updating new project";
			})
	}
})

export default taskSlice.reducer;
export const { addTask } = taskSlice.actions;

