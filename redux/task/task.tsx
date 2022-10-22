import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProject, createTask, getAllPendingTask, getAllProject, swapTask, updateTask } from "./taskServices";
import { ListType, SelectTaskPayloadType, TaskStateType, TaskSwapType } from "./taskTypes";

//! reset all new variable to logout reducer
const initialState: TaskStateType = {
	selectedTask: null,
	selectedProject:null,
	isSidebarOpen:false,
	todayCompleted: [],
	previouslyCompletedTask: [],
	pendingTasks: [],
	projects: [],
	loading: false
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		selectTask: (state, action:PayloadAction<SelectTaskPayloadType>) => {
			if(action.payload.type==ListType.pending){
				state.selectedTask = state.pendingTasks.find(tk=>tk._id==action.payload.id);
			}
			else if(action.payload.type==ListType.today){
				state.selectedTask =  state.todayCompleted.find(tk=>tk._id==action.payload.id);
			}
			else if(action.payload.type == ListType.previous){
				state.selectedTask =  state.previouslyCompletedTask.find(tk=>tk._id==action.payload.type);
			}
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
			toast.error(action.error.message ?? "Something went wrong while creating project");
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
				toast.error(action.error.message ?? "Something went wrong while fetching all projects");
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
				toast.error(action.error.message ?? "Something went wrong while fetching all pendingTasks");
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
				toast.error(action.error.message ?? "Something went wrong while creating new project");
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
			.addCase(updateTask.rejected, (state, action:any) => {
				state.loading = false;
				toast.error(action.error.message ?? "Something went wrong while updating new project");
			})
			.addCase(swapTask.pending,(state,{meta})=>{
				const drapIndex = meta.arg.dragTaskIndex;
				const dropIndex = meta.arg.dropTaskIndex;
				const type = meta.arg.type;
				if(type==ListType.pending){
					[state.pendingTasks[drapIndex], state.pendingTasks[dropIndex]] = [state.pendingTasks[dropIndex], state.pendingTasks[drapIndex]];
				}
				else if(type ==ListType.today){
					[state.todayCompleted[drapIndex], state.todayCompleted[dropIndex]] = [state.todayCompleted[dropIndex], state.todayCompleted[drapIndex]];
				}
				else{
					[state.previouslyCompletedTask[drapIndex], state.previouslyCompletedTask[dropIndex]] = [state.previouslyCompletedTask[dropIndex], state.previouslyCompletedTask[drapIndex]];
				}
		
			})
	}
})

export default taskSlice.reducer;
export const { selectTask,selectProject,closeSidebar} = taskSlice.actions;
