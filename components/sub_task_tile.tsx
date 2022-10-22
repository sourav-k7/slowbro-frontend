import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { TaskStatus } from '../model/task'
import DropDownMenu from './layout/drop_down_menu'

interface PropType {
	title: String,
	status: TaskStatus,
	onRemove:()=>void,
	bgColor:string,
}

export default function SubtaskTile({ title, status,onRemove,bgColor }: PropType) {
	return (
		<div className={`${
			TaskStatus.unstarted==status?bgColor:
			TaskStatus.started==status?'bg-amber-200 bg-opacity-30':
			'bg-lime-200 bg-opacity-30 line-through'} 
		relative px-3 py-1 my-1 items-center rounded flex justify-between`}>
			<AiOutlineClose className='absolute -right-1 -top-1 bg-slate-400 text-slate-900 p-1 rounded-full cursor-pointer' 
			size={15} onClick={onRemove} />
			<div>{title}</div>
			<div className='mr-3'>
				<DropDownMenu selectedOption={status.toString()} 
					Options={[TaskStatus.unstarted, TaskStatus.started, TaskStatus.completed]}
				 	onOptionClick={() => {}} />
			</div>
		</div>
	)
}
