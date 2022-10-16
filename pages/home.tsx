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
import { createProject } from '../redux/services/taskServices';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TaskStateType } from '../redux/task';
import { Project } from '../model/project';



export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const [selectedTask, setSelectedTask] = useState(false);
	const [dragId, setDragId] = useState();
	const [isProjectModalVisible, setIsProjectModelVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState('');
	const taskState = useSelector<RootState ,TaskStateType>((state)=>state.task);
	const [selectedProject,setSelectedProject] = useState<Project>();


	useEffect(() => {
		if (localStorage.getItem('slowbro-token') == null) {
			router.replace('/');
		}
		else {
			setLoading(false);
		}
	}, [router])

	useEffect(()=>{
		if(taskState.projects.length>0){
			setSelectedProject(taskState.projects[0]);
		}
	},[])

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


	async function onlogout() {
		await dispatch<any>(logout());
		localStorage.removeItem('slowbro-token');
		router.replace('/');
	}

	function toggleProjectModalVisibility() {
		setIsProjectModelVisible(state => !state);
	}

	function onCreateNewProject() {
		dispatch<any>(createProject({ name: newProjectName }));
	}

	if (loading) {
		return <div></div>;
	}

	return (
		<div className='overflow-x-hidden min-h-screen flex scroll'>
			<div className='absolute right-1 top-3'>
				<button onClick={onlogout}>
					<FiLogOut size={30} />
				</button>
			</div>
			<div className={`w-1/2 m-auto mt-3 `}>
				<div className='flex  justify-center mb-7 gap-3 items-end'>
					<Image src={bugImage} width='100' height={100} alt='bug.png' />
					<div className=''>
						<h1 className='text-6xl font-bold '>Tasks</h1>
						<div className='flex items-center gap-1'>
							<DropDownMenu selectedOption={selectedProject!.name} Options={taskState.projects.map(proj=>proj.name)} onOptionClick={() => { }} />
							<button className='bg-slate-700 rounded' onClick={toggleProjectModalVisibility}>
								<BsPlus size={30} />
							</button>
						</div>
					</div>
				</div>
				<ToggleTaskList title={"Today's completed task"} >
					{boxes.map((ele, index) =>
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

			{isProjectModalVisible && <Modal
				isVisible={isProjectModalVisible}
				onClose={toggleProjectModalVisibility}
			>
				<div className='w-80'>
					<div>Project name</div>
					<input className='input-field mb-3 w-full' onChange={(event) => { setNewProjectName(event.target.value) }} />
					<div>
						<button className='btn-primary mr-3' onClick={onCreateNewProject}>Create</button>
						<button onClick={toggleProjectModalVisibility}>cancel</button>
					</div>
				</div>
			</Modal>}
		</div>
	)
}

