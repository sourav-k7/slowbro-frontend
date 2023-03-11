import React, { useEffect } from 'react'
import useDragDrop from '../hooks/drag_drop_hook'
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { selectTask } from '../redux/task/task';
import { getAllPreviouslyCompletedTask } from '../redux/task/taskServices';
import { ListType, PreviousTaskServiceType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile'

export default function PreviouslyCompletedTask() {
	const [setDragId, handleDrop] = useDragDrop(ListType.previous);
	const dispatch = useAppDispatch();
	const previouslyCompletedTask = useAppSelector(state => state.task.previouslyCompletedTask);
	const selectedProject = useAppSelector(state => state.task.selectedProject);


	useEffect(() => {
		if(selectedProject!=null){
			dispatch<any>(getAllPreviouslyCompletedTask({ skip: 0, project: selectedProject?._id } as PreviousTaskServiceType));
		}
	}, [selectedProject]);

	function handleLoadMore() {
		let skip = previouslyCompletedTask.filter(tk => tk.project == selectedProject?._id).length;
		dispatch<any>(getAllPreviouslyCompletedTask({ skip:skip , project: selectedProject?._id } as PreviousTaskServiceType));
	}

	return (
		<ToggleTaskList title={'Previously completed task'}>

			<div>
				{previouslyCompletedTask
					.filter(tk => tk.project == selectedProject?._id)
					.map((tk) =>
						<TaskTitleTile
							title={tk.task}
							id={tk._id}
							key={tk._id}
							point={tk.point}
							handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.today } as SelectTaskPayloadType))}
							handleDrag={() => { setDragId(tk._id) }}
							handleDrop={() => { handleDrop(tk._id) }}
						/>
					)}

				<button className='btn-primary w-full' onClick={handleLoadMore}>
					Load More
				</button>
			</div>

		</ToggleTaskList>
	)
}
