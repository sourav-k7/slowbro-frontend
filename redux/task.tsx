import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../model/task";


const initialState:{
	tasks:Task[],
	loading:Boolean,
	error:String|null,
} = {
	tasks:[],
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
})

export default taskSlice.reducer;
export const {addTask} = taskSlice.actions;

