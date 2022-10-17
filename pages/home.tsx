import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/layout/sidebar';
import ToggleTaskList from '../components/layout/toggle_list'
import ActiveTile from '../components/active_tile';
import bugImage from '../public/bug.png'
import TaskTitleTile from '../components/task_title_tile';
import DropDownMenu from '../components/layout/drop_down_menu';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { useAppDispatch } from '../hooks/redux_hooks';
import { logout } from '../redux/user';
import { BsPlus } from 'react-icons/bs';
import Modal from '../components/layout/modal';
import { createProject, getAllProject, getAllTask } from '../redux/services/taskServices';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TaskStateType } from '../redux/task';
import { Project } from '../model/project';
import { Task } from '../model/task';



export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const [selectedTask, setSelectedTask] = useState<Task|null>(null);
	const [isSidebarOpen,setSidebarOpen] = useState(false);
	const [dragId, setDragId] = useState();
	const [isProjectModalVisible, setIsProjectModelVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState('');
	const taskState = useSelector<RootState, TaskStateType>((state) => state.task);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	useEffect(() => {
		console.log('in use Effect in home');
		dispatch<any>(getAllProject());
		dispatch<any>(getAllTask());
	}, [])

	useEffect(() => {
		if (localStorage.getItem('slowbro-token') == null) {
			router.replace('/');
		}
		else {
			setLoading(false);
		}
	}, [router])

	useEffect(() => {
		if (taskState.projects.length > 0 && selectedProject == null) {
			setSelectedProject(taskState.projects[0]);
		}
	}, [taskState.projects])

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

	const handleDrag = (ev: any) => {
		setDragId(ev.currentTarget.id);
	};

	function swapElements(arr: any, i1: number, i2: number) {
		let tempArr = [...arr];
		[tempArr[i1], tempArr[i2]] = [tempArr[i2], tempArr[i1]];
		return tempArr;
	}

	const handleDrop = (ev: any) => {
		const dragBox = boxes.findIndex((box) => box.id === dragId);
		const dropBox = boxes.findIndex((box) => box.id === ev.currentTarget.id);
		const newBoxState = swapElements(boxes, dragBox, dropBox);
		setBoxes(newBoxState);
	};


	async function onLogout() {
		await dispatch<any>(logout());
		localStorage.removeItem('slowbro-token');
		router.replace('/');
	}

	function toggleNewProjectModalVisibility() {
		setIsProjectModelVisible(state => !state);
	}

	function onCreateNewProject() {
		dispatch<any>(createProject({ name: newProjectName }));
		toggleNewProjectModalVisibility();
	}

	if (loading) {
		return <div></div>;
	}

	return (
		<div className='overflow-x-hidden min-h-screen flex scroll'>
			<div className={`w-1/2 m-auto mt-3 relative `}>
			<div className='absolute right-1 top-3'>
				<button onClick={onLogout}>
					<FiLogOut size={30} />
				</button>
			</div>
				<div className='flex  justify-center mb-7 gap-3 items-end'>
					<Image src={bugImage} width='100' height={100} alt='bug.png' />
					<div className=''>
						<h1 className='text-6xl font-bold '>Tasks</h1>
						<div className='flex items-center gap-1'>
							{taskState.projects.length > 0 &&
								<DropDownMenu
									selectedOption={selectedProject?.name ?? ''}
									Options={taskState.projects.map(proj => proj.name)}
									onOptionClick={(index) => { setSelectedProject(taskState.projects[index]) }} />}
							<button
								className={`bg-slate-700 rounded ${taskState.projects.length == 0 ? 'w-full' : ''} flex 
										items-center justify-center`}
								onClick={toggleNewProjectModalVisibility}>
								{taskState.projects.length == 0 && <span>Add Project</span>}	<BsPlus size={30} />
							</button>
						</div>
					</div>
				</div>
				<ToggleTaskList title={"Today's completed task"} >
					{boxes.map((ele, index) =>
						<TaskTitleTile handleDrag={handleDrag} handleDrop={handleDrop} title={ele.color} id={ele.id} key={index} />
					)}
				</ToggleTaskList>
				<div className='flex justify-between items-center'>
					<div className='font-bold text-lg'>Active Task</div>
					<button className='btn-primary flex items-center' 
					onClick={()=>{
						setSelectedTask(null);
						setSidebarOpen(true)
						}}  >
						Add new task &nbsp; <BsPlus size={20} />
					</button>
				</div>
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
			<Sidebar isSidebarOpen={isSidebarOpen} onClose={()=>setSidebarOpen(false)} task={selectedTask} 
					 project={selectedProject} />

			{isProjectModalVisible && <Modal
				isVisible={isProjectModalVisible}
				onClose={toggleNewProjectModalVisibility}
			>
				<div className='w-80'>
					<div>Project name</div>
					<input className='input-field mb-3 w-full' onChange={(event) => { setNewProjectName(event.target.value) }} />
					<div>
						<button className='btn-primary mr-3' onClick={onCreateNewProject}>Create</button>
						<button onClick={toggleNewProjectModalVisibility}>cancel</button>
					</div>
				</div>
			</Modal>}
		</div>
	)
}

