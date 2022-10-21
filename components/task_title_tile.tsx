import React,{useState} from 'react'
import { useAppDispatch } from '../hooks/redux_hooks';
import { TaskStatus } from '../model/task';
import { selectTask } from '../redux/task/task';
import DropDownMenu from './layout/drop_down_menu';

interface PropTypes {
	title: string,
	id: string,
}


export default function TaskTitleTile({ title,  id }: PropTypes) {
	const dispatch = useAppDispatch();
	const [dragId, setDragId] = useState();
	const handleDrag = (ev: any) => {
		setDragId(ev.currentTarget.id);
	};

	function swapElements(arr: any, i1: number, i2: number) {
		let tempArr = [...arr];
		[tempArr[i1], tempArr[i2]] = [tempArr[i2], tempArr[i1]];
		return tempArr;
	}

	const handleDrop = (ev: any) => {
		// const dragBox = boxes.findIndex((box) => box.id === dragId);
		// const dropBox = boxes.findIndex((box) => box.id === ev.currentTarget.id);
		// const newBoxState = swapElements(boxes, dragBox, dropBox);
		// setBoxes(newBoxState);
	};

	
	
	return (

		<div
			className={`bg-slate-800 p-3 my-1 rounded-md cursor-pointer flex justify-between items-center`}
			draggable={true}
			id={id}
			onDragOver={(ev) => ev.preventDefault()}
			onDragStart={handleDrag}
			onDrop={handleDrop}
			onClick={()=>dispatch(selectTask(id))}
		>
			<div>{title}</div>
			<div className='w-32'>
				<DropDownMenu
						selectedOption={TaskStatus.unstarted}
						Options={[TaskStatus.unstarted, TaskStatus.started, TaskStatus.completed]}
						onOptionClick={() => { }} />
			</div>
		</div>

	)
}
