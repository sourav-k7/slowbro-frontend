import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Task, TaskStatus } from "../../model/task";
import { completeTask, createProject, createTask, getAllPendingTask, getAllPreviouslyCompletedTask, getAllProject, getAllTodayCompletedTask, swapTask, updateTask } from "./taskServices";
import { ListType, SelectTaskPayloadType, TaskStateType, TaskSwapType } from "./taskTypes";

//! reset all new variable to logout reducer
const initialState: TaskStateType = {
	selectedTask: null,
	selectedProject: null,
	isSidebarOpen: false,
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
		selectTask: (state, action: PayloadAction<SelectTaskPayloadType>) => {
			if (action.payload.type == ListType.pending) {
				state.selectedTask = state.pendingTasks.find(tk => tk._id == action.payload.id);
			}
			else if (action.payload.type == ListType.today) {
				state.selectedTask = state.todayCompleted.find(tk => tk._id == action.payload.id);
			}
			else if (action.payload.type == ListType.previous) {
				state.selectedTask = state.previouslyCompletedTask.find(tk => tk._id == action.payload.type);
			}
			state.isSidebarOpen = true;
		},
		closeSidebar: (state) => {
			state.isSidebarOpen = false;
		},
		selectProject: (state, action) => {
			state.selectedProject = state.projects.find(proj => proj._id == action.payload);
		},
		markAsUncompleteTask: (state, action: PayloadAction<Task>) => {
			state.todayCompleted = state.todayCompleted.filter(tk => tk._id != action.payload._id);
			state.previouslyCompletedTask = state.previouslyCompletedTask.filter(tk => tk._id != action.payload._id);
			state.pendingTasks.push(action.payload);
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
				toast.success('Project created');
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
				toast.success('Task created');
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
				toast.success('Task updated');
			})
			.addCase(updateTask.rejected, (state, action: any) => {
				state.loading = false;
				toast.error(action.error.message ?? "Something went wrong while updating new project");
			})
			.addCase(swapTask.pending, (state, { meta }) => {
				const dragId = meta.arg.dragTaskId;
				const dropId = meta.arg.dropTaskId;
				const listType = meta.arg.type;
				let swapList: Task[] = [];
				if (listType == ListType.pending) {
					swapList = state.pendingTasks;
				}
				else if (listType == ListType.today) {
					swapList = state.todayCompleted;
				}
				else {
					swapList = state.previouslyCompletedTask;
				}
				let drapIndex = swapList.findIndex(tk => tk._id == dragId);
				let dropIndex = swapList.findIndex(tk => tk._id == dropId);
				const type = meta.arg.type;
				if (type == ListType.pending) {
					[state.pendingTasks[drapIndex], state.pendingTasks[dropIndex]] = [state.pendingTasks[dropIndex], state.pendingTasks[drapIndex]];
				}
				else if (type == ListType.today) {
					[state.todayCompleted[drapIndex], state.todayCompleted[dropIndex]] = [state.todayCompleted[dropIndex], state.todayCompleted[drapIndex]];
				}
				else {
					[state.previouslyCompletedTask[drapIndex], state.previouslyCompletedTask[dropIndex]] = [state.previouslyCompletedTask[dropIndex], state.previouslyCompletedTask[drapIndex]];
				}

			})
			.addCase(getAllTodayCompletedTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllTodayCompletedTask.fulfilled, (state, action) => {
				state.loading = false;
				state.todayCompleted = action.payload;
			})
			.addCase(getAllTodayCompletedTask.rejected, (state, action) => {
				state.loading = false;
				toast.error(action.error.message ?? "Something went wrong while fetching all today completed task.")
			})
			.addCase(completeTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(completeTask.fulfilled, (state, action) => {
				state.loading = false;
				state.todayCompleted.push(action.payload);
				state.pendingTasks = state.pendingTasks.filter(tk => tk._id != action.payload._id);
			})
			.addCase(completeTask.rejected, (state, action) => {
				state.loading = false;
				toast.error(action.error.message ?? 'Something went wrong');
			})
			.addCase(getAllPreviouslyCompletedTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllPreviouslyCompletedTask.fulfilled, (state, action) => {
				state.loading = false;
				state.previouslyCompletedTask.push(...action.payload);
			})
			.addCase(getAllPreviouslyCompletedTask.rejected, (state, action) => {
				state.loading = false;
				toast.error(action.error.message ?? "Something went wrong while fetching previously completed task");
			})
	}
})

export default taskSlice.reducer;
export const { selectTask, selectProject, closeSidebar, markAsUncompleteTask } = taskSlice.actions;
