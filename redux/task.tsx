import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../model/project";
import { Task } from "../model/task";

//! add all new variable to logout reducer
const initialState:{
	tasks:Task[],
	projects:Project[],
	loading:Boolean,
	error:String|null,
} = {
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

		}
	},
	extraReducers: builder=>{
		builder
		.addCase('user/logout',(state)=>{
			state.tasks = [];
			state.projects = [];
		});
	}
})

export default taskSlice.reducer;
export const {addTask} = taskSlice.actions;

