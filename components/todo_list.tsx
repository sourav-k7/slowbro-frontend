import React from 'react'
import { BiSortDown } from 'react-icons/bi';
import { BsSortNumericUpAlt } from 'react-icons/bs';
import useDragDrop from '../hooks/drag_drop_hook';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks'
import { PriorityType, TaskStatus } from '../model/task';
import { selectTask, pointSortPendingTask, prioritySortPendingTask } from '../redux/task/task';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import Tooltip from './layout/tooltip';
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const [setDragId, handleDrop] = useDragDrop(ListType.pending);
	const dispatch = useAppDispatch();
	const task = useAppSelector(state => state.task.pendingTasks);
	const selectedProject = useAppSelector(state => state.task.selectedProject);

	return (
		<div className='relative '>
			<Tooltip content='Sort by priority'>
				<BiSortDown
				className='absolute right-20 top-4 cursor-pointer'
				onClick={()=>dispatch(prioritySortPendingTask())}
				size={26}
				/>
			</Tooltip>
			<Tooltip content='Sort by point'>
			<BsSortNumericUpAlt
				className='absolute right-10 top-4 cursor-pointer'
				onClick={() => dispatch(pointSortPendingTask())}
				size={26} />
			</Tooltip>
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



