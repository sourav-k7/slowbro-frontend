import Head from 'next/head';
import React from 'react'
import { TaskStatus } from '../model/task';
import DropDownMenu from './layout/drop_down_menu';
import QuestionTile from './layout/question_tile';
import SubtaskTile from './sub_task_tile';

export default function ActiveTile() {
	return (
		<div className='my-3 p-3 bg-slate-800 rounded-md'>
			<Head>
			<meta charSet="UTF-8" />
			</Head>

			<div className='text-xl font-semibold'>Task Name</div>
			<div className='text-gray-400 mb-3'>Project</div>
			<div className='mb-3 w-32'>
				<DropDownMenu
					selectedOption={TaskStatus.unstarted}
					Options={[TaskStatus.unstarted, TaskStatus.started, TaskStatus.completed]}
					onOptionClick={() => { }} />
			</div>
			<div className='font-semibold '>Description</div>
			<div className='bg-slate-700 mb-3 p-3 rounded'>this is a test description</div>
			{/* <div>Image</div> */}
			<div className='font-semibold'>SubTask</div>
			<div className='bg-slate-700 p-3 rounded mb-3'>
				{/* <SubtaskTile title={'Subtask'} status={TaskStatus.unstarted} onRemove={()=>{}} bgColor={'bg-slate-600'} />
				<SubtaskTile title={'Subtask'} status={TaskStatus.started} onRemove={()=>{}} bgColor={'bg-slate-600'} />
				<SubtaskTile title={'Subtask'} status={TaskStatus.completed} onRemove={()=>{}} bgColor={'bg-slate-600'} /> */}
			</div>
			
			<div className='font-semibold mb-3'>Points : 3 &#128293;</div>
			<div className='font-semibold'>Doubt</div>
			<div className='bg-slate-700 mb-3 p-3 rounded'>

				{/* <QuestionTile question={'what to do in this task?'} answer={'some temp answer'} bgColor={'bg-slate-600'} /> */}
			</div>
			<div className='font-semibold'>Comments</div>
			<div className=" bg-slate-700 mb-1 p-3 rounded">
				some random comment 
			</div>
		</div>
	)
}
