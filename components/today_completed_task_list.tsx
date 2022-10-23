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
	const taskState = useAppSelector(state=>state.task);
	const todayCompleteList =taskState.todayCompleted;
	const selectedProject = taskState.selectedProject;

	useEffect(() => {
		dispatch<any>(getAllTodayCompletedTask());
	}, [])
	
	
	return (
		<ToggleTaskList title={"Today's completed task"} >
			{todayCompleteList
			.filter(tk => tk.project == selectedProject?._id)
			.map((tk,index) =>
						<TaskTitleTile  
						title={tk.task} 
						id={tk._id} 
						key={tk._id} 
						point={tk.point}
						handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.today } as SelectTaskPayloadType))}
						handleDrag={() => { setDragId(index) }}
					handleDrop={() => { handleDrop(index) }}
						/>
					)}
		</ToggleTaskList>
	)
}
