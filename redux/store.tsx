import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './task/task';
import thunkMiddleware from 'redux-thunk'
import userReducer from './user/user';



const store = configureStore({
	reducer:{
		task:taskReducer,
		user:userReducer,
	},
	middleware:[thunkMiddleware]
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch