import React from 'react'
import useDragDrop from '../hooks/drag_drop_hook';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks'
import { TaskStatus } from '../model/task';
import { selectTask } from '../redux/task/task';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const [setDragId,handleDrop] = useDragDrop(ListType.pending);
	const dispatch = useAppDispatch();
	const taskState = useAppSelector(state => state.task);
	const task = taskState.pendingTasks;
	const selectedProject = taskState.selectedProject;

	return (
		<ToggleTaskList title={'Todo'}>
			{task.filter(tk => tk.project == selectedProject?._id).map((tk, index) => (
				<TaskTitleTile
					key={tk._id}
					id={tk._id}
					title={tk.task}
					point={tk.point}
					handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.pending } as SelectTaskPayloadType))}
					handleDrag={() => { setDragId(index) }}
					handleDrop={() => { handleDrop(index) }}
					bgColor={tk.status == TaskStatus.started ? 
											'bg-amber-200 bg-opacity-30' : 
											'bg-slate-800'}
				/>))}
		</ToggleTaskList>
	)
}



