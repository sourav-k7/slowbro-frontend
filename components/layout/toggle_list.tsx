import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';

interface PropType {
	title: String,
	children: JSX.Element | JSX.Element[];
}

export default function ToggleTaskList({
	title, children
}: PropType) {
	const [isExpanded ,setIsExpanded] =useState(false);

	function onToggleList(){
		setIsExpanded(state=>!state)
	}
	
	return (
		<div className='bg-gray-900 p-3 rounded-md font-semibold my-2'>
			<div className='flex justify-between mt-1 mb-3 items-center cursor-pointer'
				onClick={onToggleList}
			>
				{title} 
				
					<div className={`transform ${isExpanded?'rotate-0':'rotate-180'}`}>
						<FaChevronDown  />
					</div>
				
			</div>
			<div>
				<hr />
				{children}
			</div>
		</div>
	)
}
