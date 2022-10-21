import React,{useState} from 'react'

interface PropTypes {
	title: string,
	id: string,
}


export default function TaskTitleTile({ title,  id }: PropTypes) {
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
			className={`bg-slate-800 p-3 my-1 rounded-md cursor-pointer `}
			draggable={true}
			id={id}
			onDragOver={(ev) => ev.preventDefault()}
			onDragStart={handleDrag}
			onDrop={handleDrop}
		>
			{title}
		</div>

	)
}
