import React ,{useState} from 'react';
import { swapTask } from '../redux/task/taskServices';
import { ListType, TaskSwapType } from "../redux/task/taskTypes";
import { useAppDispatch } from './redux_hooks';

function useDragDrop(listType:ListType):[ React.Dispatch<React.SetStateAction<string| undefined>>,(a:string)=>void]{
	const [dragId,setDragId] = useState<string>();
	const dispatch = useAppDispatch();

	const handleDrop = (dropId: string) => {
		dispatch<any>(swapTask({
			dragTaskId: dragId,
			dropTaskId: dropId,
			type: listType,
		} as TaskSwapType));
	};

	return [setDragId,handleDrop]
}

export default useDragDrop;