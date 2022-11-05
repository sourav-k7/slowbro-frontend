import React from 'react'
import { BsSortNumericUpAlt } from 'react-icons/bs';
import useDragDrop from '../hooks/drag_drop_hook';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks'
import { PriorityType, TaskStatus } from '../model/task';
import { selectTask, sortPendingTask } from '../redux/task/task';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const [setDragId, handleDrop] = useDragDrop(ListType.pending);
	const dispatch = useAppDispatch();
	const task = useAppSelector(state => state.task.pendingTasks);
	const selectedProject = useAppSelector(state => state.task.selectedProject);

	return (
		<div className='relative'>
			<BsSortNumericUpAlt
				className='absolute right-10 top-4 cursor-pointer'
				onClick={() => dispatch(sortPendingTask())}
				size={26} />
			<ToggleTaskList title={'Todo'}>
				{task.filter(tk => tk.project == selectedProject?._id)
					.map((tk) => (
						<TaskTitleTile
							key={tk._id}
							id={tk._id}
							title={tk.task}
							priority={tk.priority??PriorityType.low}
							point={tk.point}
							handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.pending } as SelectTaskPayloadType))}
							handleDrag={() => { setDragId(tk._id) }}
							handleDrop={() => { handleDrop(tk._id) }}
							bgColor={tk.status == TaskStatus.started ?
								'bg-amber-200 bg-opacity-30' :
								'bg-slate-800'}
						/>))}
			</ToggleTaskList>
		</div>
	)
}



