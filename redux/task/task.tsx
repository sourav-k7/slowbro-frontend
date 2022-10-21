import { createSlice } from "@reduxjs/toolkit";
import { createProject, createTask, getAllPendingTask, getAllProject, updateTask } from "./taskServices";
import { TaskStateType } from "./taskTypes";

//! reset all new variable to logout reducer
const initialState: TaskStateType = {
	selectedTask: null,
	selectedProject:null,
	isSidebarOpen:false,
	todayCompleted: [],
	previouslyCompletedTask: [],
	pendingTasks: [],
	projects: [],
	loading: false,
	error: null,
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		selectTask: (state, action) => {
			state.selectedTask = state.pendingTasks.find(tk=>tk._id==action.payload);
			state.selectedTask = state.todayCompleted.find(tk=>tk._id==action.payload);
			state.selectedTask = state.previouslyCompletedTask.find(tk=>tk._id==action.payload);
			state.isSidebarOpen = true;
		},
		closeSidebar:(state)=>{
			state.isSidebarOpen = false;
		},
		selectProject:(state,action)=>{
			state.selectedProject = state.projects.find(proj=>proj._id == action.payload);
		}
	},
	extraReducers: builder => {
		builder
			.addCase('user/logout', (state) => {
				state.pendingTasks = [];
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
				state.selectedProject = action.payload[0];
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
				state.pendingTasks = action.payload;
			})
			.addCase(getAllPendingTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Something went wrong while fetching all pendingTasks";
			})
			.addCase(createTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.loading = false;
				state.pendingTasks.push(action.payload);
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
				state.pendingTasks = state.pendingTasks.map(tk => {
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
export const { selectTask,selectProject,closeSidebar} = taskSlice.actions;

