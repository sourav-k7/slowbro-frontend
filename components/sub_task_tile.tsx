import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { TaskStatus } from '../model/task'
import DropDownMenu from './layout/drop_down_menu'

interface PropType {
	title: String,
	status: TaskStatus,
	onRemove: () => void,
	bgColor: string,
	handleStatusUpdate: (a: TaskStatus) => void
}

export default function SubtaskTile({ title, status, onRemove, bgColor, handleStatusUpdate }: PropType) {
	return (
		<div className={`${TaskStatus.unstarted == status ? bgColor :
				TaskStatus.started == status ? 'bg-amber-200 bg-opacity-30' :
					'bg-lime-200 bg-opacity-30'} 
		relative px-3 py-1 my-1  rounded flex flex-col md:flex-row justify-between`}>
			<AiOutlineClose className='absolute -right-1 -top-1 bg-slate-400 text-slate-900 p-1 rounded-full cursor-pointer'
				size={15} onClick={onRemove} />
			<div className={`${TaskStatus.completed == status ? 'line-through' : ''}`}>{title}</div>
			<div className='mr-2 w-full md:w-32 self-end md:self-center mt-3 md:mt-0'>
				<DropDownMenu selectedOption={status.toString()}
					Options={Object.values(TaskStatus).map(val => val)}
					onOptionClick={(index) => { handleStatusUpdate(Object.values(TaskStatus)[index]) }} />
			</div>
		</div>
	)
}
