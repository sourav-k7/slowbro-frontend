import React ,{useState} from 'react';
import { swapTask } from '../redux/task/taskServices';
import { ListType, TaskSwapType } from "../redux/task/taskTypes";
import { useAppDispatch } from './redux_hooks';

function useDragDrop(listType:ListType):[ React.Dispatch<React.SetStateAction<number| undefined>>,(a:number)=>void]{
	const [dragId,setDragId] = useState<number>();
	const dispatch = useAppDispatch();

	const handleDrop = (dropId: number) => {
		dispatch<any>(swapTask({
			dragTaskIndex: dragId,
			dropTaskIndex: dropId,
			type: listType,
		} as TaskSwapType));
	};

	return [setDragId,handleDrop]
}

export default useDragDrop;