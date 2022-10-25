import React,{useEffect} from 'react'
import useDragDrop from '../hooks/drag_drop_hook'
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { selectTask } from '../redux/task/task';
import { getAllTodayCompletedTask } from '../redux/task/taskServices';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list';
import TaskTitleTile from './task_title_tile';

export default function TodayCompletedTaskList() {
	const [setDragId, handleDrop] = useDragDrop(ListType.today);
	const dispatch = useAppDispatch();
	const todayCompleteList =useAppSelector(state => state.task.todayCompleted);
	const selectedProject = useAppSelector(state => state.task.selectedProject);

	useEffect(() => {
		dispatch<any>(getAllTodayCompletedTask());
	}, [])
	
	
	return (
		<ToggleTaskList title={"Today's completed task"} >
			{todayCompleteList
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
		</ToggleTaskList>
	)
}
