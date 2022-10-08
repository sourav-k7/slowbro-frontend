import Image from 'next/image'
import React from 'react'
import ToggleTaskList from '../components/layout/toggle_list'
import bugImage from '../public/bug.png'

export default function Home() {
	return (
		<div className='w-1/2 m-auto mt-3'>
			<div className='flex  justify-center mb-7 gap-3'>
				<Image src={bugImage} width='100' height={100} alt='bug.png' />
				<div>
					<h1 className='text-6xl font-bold '>Tasks</h1>
					<div>Project Name</div>
				</div>
			</div>

			<ToggleTaskList title={"Today's completed task"}>
				<div>task1</div>
				<div>task2</div>
				<div>task3</div>
			</ToggleTaskList>

			<div>Active task</div>
			<ToggleTaskList title={'Todo'}>
				<div></div>
			</ToggleTaskList>
			<ToggleTaskList title={'Previously completed task'}>
				<div></div>
				</ToggleTaskList>
		</div>
	)
}
