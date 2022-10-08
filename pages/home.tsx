import Image from 'next/image'
import React, { useState } from 'react'
import { config, useTransition, animated } from 'react-spring';
import Sidebar from '../components/layout/sidebar';
import ToggleTaskList from '../components/layout/toggle_list'
import ActiveTile from '../components/active_tile';
import bugImage from '../public/bug.png'
import TaskTitleTile from '../components/task_title_tile';









export default function Home() {
	const [isProjectMenuVisible, setIsProjectMenuVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState(false);
	const [dragId, setDragId] = useState();
	const [boxes, setBoxes] = useState([
		{
		  id: "Box-1",
		  color: "red",
		  order: 1
		},
		{
		  id: "Box-2",
		  color: "green",
		  order: 2
		},
		{
		  id: "Box-3",
		  color: "blue",
		  order: 3
		}
	  ]);

	const handleDrag = (ev:any) => {
	  setDragId(ev.currentTarget.id);
	};

	function swapElements(arr:any, i1:number, i2:number) {
		let tempArr=[...arr];
		[tempArr[i1], tempArr[i2]] = [tempArr[i2], tempArr[i1]];
		return tempArr;
	  }

	const handleDrop = (ev:any) => {
		const dragBox = boxes.findIndex((box) => box.id === dragId);
		const dropBox = boxes.findIndex((box) => box.id === ev.currentTarget.id);
		const newBoxState = swapElements(boxes,dragBox,dropBox);
		setBoxes(newBoxState);
	  };

	const transitions = useTransition(isProjectMenuVisible, {
		from: {
			opacity: 0,
			transform: `scale(${0.9})`,
			transformOrigin: "top right"
		},
		enter: { opacity: 1, transform: `scale(${1})` },
		leave: { opacity: 0, transform: `scale(${0.9})` },
		config: config.wobbly
	});

	




	function toggleProjectMenu() {
		setIsProjectMenuVisible(state => !state);
	}


	return (
		<div className='overflow-x-hidden min-h-screen flex scroll'>

			<div className={`w-1/2 m-auto mt-3 `}>
				<div className='flex  justify-center mb-7 gap-3 items-end'>
					<Image src={bugImage} width='100' height={100} alt='bug.png' />
					<div className=''>
						<h1 className='text-6xl font-bold '>Tasks</h1>
						<button onClick={toggleProjectMenu} className='relative'>
							Project Name

							{transitions((props:any, item:any) =>
								item && (
									<animated.div
										style={props}
										className="mt-2 absolute right-0 origin-top-right"
									>
										<div className='bg-white text-black'>
											test
										</div>
									</animated.div>
								)
							)
							}
						</button>
					</div>
				</div>
				<button onClick={() => setSelectedTask(state => !state)}>sidebar</button>



				<ToggleTaskList title={"Today's completed task"} >
				{	boxes.map((ele,index)=>
					<TaskTitleTile handleDrag={handleDrag} handleDrop={handleDrop} title={ele.color} id={ele.id} key={index} />
					)}
				</ToggleTaskList>
				<ActiveTile />
				<ToggleTaskList title={'Todo'}>
					{/* <TaskTitleTile index={1} title={'Task 1'} />
					<TaskTitleTile index={2} title={'Task 1'} />
					<TaskTitleTile index={3} title={'Task 1'} /> */}
				</ToggleTaskList>
				<ToggleTaskList title={'Previously completed task'}>
					{/* <TaskTitleTile index={1} title={'Task 1'} />
					<TaskTitleTile index={2} title={'Task 1'} />
					<TaskTitleTile index={3} title={'Task 1'} /> */}
				</ToggleTaskList>
			</div>
			<Sidebar isSidebarOpen={selectedTask} />

		</div>
	)
}

