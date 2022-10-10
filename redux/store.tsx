import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './task';
import thunkMiddleware from 'redux-thunk'



const store = configureStore({
	reducer:{
		task:taskReducer,
	},middleware:[thunkMiddleware]
})

export default store;