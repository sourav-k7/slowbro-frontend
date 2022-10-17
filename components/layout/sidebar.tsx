import React,{useState} from 'react'
import { animated, useSpring } from 'react-spring'
import {AiOutlineClose} from 'react-icons/ai';
import { Task } from '../../model/task';

interface PropTypes {
	isSidebarOpen:boolean,
	onClose:()=>void,
	task:Task | undefined,
}

export default function Sidebar({isSidebarOpen,onClose,task}:PropTypes) {
	let sidebarWidth = 300;
	
	if(typeof window !=='undefined'){
		sidebarWidth=(2*window.innerWidth)/5;
	}
	const sidebarStyle = useSpring({
	  width:isSidebarOpen?sidebarWidth:0
	});

  return (
	<animated.div style={sidebarStyle} className={`overflow-x-hidden  `}>
			<div className='h-full bg-gray-900 p-3'>
				<div><AiOutlineClose color='white' size={25} className="ml-auto mr-0 cursor-pointer" onClick={onClose} /></div>
				<div className='font-semibold text-lg'>Task Name</div>
				<textarea className='multiline-input-field mb-3 w-full' />
				<div className='font-semibold text-lg'>Description</div>
				<textarea className='multiline-input-field mb-3 w-full' />
				<div className='font-semibold text-lg'>Subtask</div>
				<div className='flex flex-col items-start mb-3'>
						<textarea className='multiline-input-field w-full' placeholder='Enter Subtask' />
					<button className='bg-slate-400 text-slate-900 px-3 mt-2 rounded'>Add Subtask</button>
				</div>
				<div className='font-semibold flex items-center mb-3 text-lg'>Point&nbsp;:&nbsp;<input className='input-field w-14' /></div>

				<div className='font-semibold text-lg'>Doubt</div>
				<div className='flex flex-col items-start mb-3'>
						<textarea className='multiline-input-field w-full' placeholder='Enter Question' />
					<button className='bg-slate-400 text-slate-900 px-3 mt-2 rounded'>Add Question</button>
				</div>
				<div className='font-semibold text-lg'>Comment</div>
				<textarea className='multiline-input-field mb-3 w-full' />
				<div><button className='btn-primary mr-3'>Save</button><button>cancel</button></div>
			</div>
	</animated.div>
  )
}
