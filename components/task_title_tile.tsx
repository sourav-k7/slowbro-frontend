import React from 'react'
import { PriorityType } from '../model/task'
import priorityIcon from './layout/priorityIcon'

interface PropTypes {
	title: string,
	id: string,
	point: number,
	priority?: PriorityType,
	handleClick: () => void,
	handleDrag: () => void,
	handleDrop: () => void,
	bgColor?: string,
}

export default function TaskTitleTile({ title, id, priority, point, handleClick, handleDrag, handleDrop, bgColor = 'bg-slate-800' }: PropTypes) {
	return (

		<div
			className={`${bgColor} p-3 my-1 rounded-md cursor-pointer flex flex-col lg:flex-row  justify-between items-start lg:items-center `}
			draggable={true}
			id={id}
			onDragOver={(ev) => ev.preventDefault()}
			onDragStart={handleDrag}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<div>{title}</div>
			<div className='font-semibold flex items-center w-20 justify-between self-end lg:self-start min-w-[5rem]'>
				{priority && <div>
					{priorityIcon(priority)}
				</div>}

				<div>{point} &#128293;</div>
			</div>
		</div>

	)
}
