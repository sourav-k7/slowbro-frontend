import React from 'react'
import { TaskStatus } from '../model/task'
import DropDownMenu from './layout/drop_down_menu'

interface PropType {
	title: String,
	status: TaskStatus,
}

export default function SubtaskTile({ title, status }: PropType) {
	return (
		<div className={`${
			TaskStatus.unstarted==status?'bg-slate-600':
			TaskStatus.started==status?'bg-amber-200 bg-opacity-30':
			'bg-lime-200 bg-opacity-30 line-through'} 
		px-3 py-1 my-1 items-center rounded flex justify-between`}>
			<div>{title}</div>
			<div className=''>
				<DropDownMenu selectedOption={status.toString()} 
					Options={[TaskStatus.unstarted, TaskStatus.started, TaskStatus.completed]}
				 	onOptionClick={() => {}} />
			</div>
		</div>
	)
}
