import React,{useState} from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks'
import { selectTask } from '../redux/task/task';
import { swapTask } from '../redux/task/taskServices';
import { ListType, SelectTaskPayloadType, TaskSwapType } from '../redux/task/taskTypes';
import ToggleTaskList from './layout/toggle_list'
import TaskTitleTile from './task_title_tile';

export default function TodoList() {
	const [dragId, setDragId] = useState<number>();
	const dispatch = useAppDispatch();
	const task = useAppSelector(state => state.task.pendingTasks);

	
	const handleDrop = (dropId:number) => {
		dispatch<any>(swapTask({
			dragTaskIndex:dragId,
			dropTaskIndex:dropId,
			type:ListType.pending,
		} as TaskSwapType ,));
		// const dragBox = boxes.findIndex((box) => box.id === dragId);
		// const dropBox = boxes.findIndex((box) => box.id === ev.currentTarget.id);
		// const newBoxState = swapElements(boxes, dragBox, dropBox);
		// setBoxes(newBoxState);
	};
	return (
		<ToggleTaskList title={'Todo'}>
			{task.map((tk,index) => <TaskTitleTile
				key={tk._id}
				id={tk._id}
				title={tk.task} 
				point={tk.point}
				handleClick={() => dispatch(selectTask({ id: tk._id, type: ListType.pending } as SelectTaskPayloadType))}
				handleDrag={()=>{setDragId(index)}}
				handleDrop={()=>{handleDrop(index)}}
				/>)}
		</ToggleTaskList>
	)
}



