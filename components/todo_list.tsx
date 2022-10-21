import React from 'react'
import { useAppSelector } from '../hooks/redux_hooks'
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const task = useAppSelector(state => state.task.pendingTasks);
	return (
		<ToggleTaskList title={'Todo'}>
			{task.map(tk => <TaskTitleTile key={tk._id} id={tk._id} title={tk.task} />)}
		</ToggleTaskList>
	)
}
