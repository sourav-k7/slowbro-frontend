import React from 'react'

interface PropTypes {
	title: string,
	id: string,
	point: number,
	handleClick:()=>void,
	handleDrag:()=>void,
	handleDrop:()=>void,
	bgColor?:string,
}

export default function TaskTitleTile({ title, id, point,handleClick,handleDrag,handleDrop,bgColor='bg-slate-800' }: PropTypes) {
	return (

		<div
			className={`${bgColor} p-3 my-1 rounded-md cursor-pointer flex justify-between items-center `}
			draggable={true}
			id={id}
			onDragOver={(ev) => ev.preventDefault()}
			onDragStart={handleDrag}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<div>{title}</div>
			<div className='font-semibold'>{point} &#128293;</div>
		</div>

	)
}
