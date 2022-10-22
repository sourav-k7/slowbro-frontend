import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks'
import { selectTask } from '../redux/task/task';
import { swapTask } from '../redux/task/taskServices';
import { ListType, SelectTaskPayloadType, TaskSwapType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const [dragId, setDragId] = useState<number>();
	const dispatch = useAppDispatch();
	const taskState = useAppSelector(state => state.task);
	const task = taskState.pendingTasks;
	const selectedProject = taskState.selectedProject;


	const handleDrop = (dropId: number) => {
		dispatch<any>(swapTask({
			dragTaskIndex: dragId,
			dropTaskIndex: dropId,
			type: ListType.pending,
		} as TaskSwapType,));
	};

	return (
		<ToggleTaskList title={'Todo'}>
			{task.filter(tk => tk.project == selectedProject?._id).map((tk, index) => <TaskTitleTile
				key={tk._id}
				id={tk._id}
				title={tk.task}
				point={tk.point}
				handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.pending } as SelectTaskPayloadType))}
				handleDrag={() => { setDragId(index) }}
				handleDrop={() => { handleDrop(index) }}
			/>)}
		</ToggleTaskList>
	)
}



