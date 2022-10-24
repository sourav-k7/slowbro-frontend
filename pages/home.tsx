import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/layout/sidebar';
import ToggleTaskList from '../components/layout/toggle_list'
import ActiveTile from '../components/active_tile';
import bugImage from '../public/bug.png'
import DropDownMenu from '../components/layout/drop_down_menu';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { logout } from '../redux/user/user';
import { BsPlus } from 'react-icons/bs';
import Modal from '../components/layout/modal';
import { createProject, getAllProject, getAllPendingTask } from '../redux/task/taskServices';
import { ListType } from '../redux/task/taskTypes';
import TodoList from '../components/todo_list';
import { selectProject, selectTask } from '../redux/task/task';
import { TaskStatus } from '../model/task';
import TodayCompletedTaskList from '../components/today_completed_task_list';
import PreviouslyCompletedTask from '../components/previously_completed_task';



export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const [isProjectModalVisible, setIsProjectModelVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState('');
	const taskState = useAppSelector(state=>state.task);
	const selectedProject = taskState.selectedProject;
	const pendingTask = taskState.pendingTasks;
	let activeTask = pendingTask.filter(tk=>tk.project==selectedProject?._id && tk.status == TaskStatus.started);

	useEffect(() => {
		console.log('in use Effect in home');
		dispatch<any>(getAllProject());
		dispatch<any>(getAllPendingTask());
	}, [dispatch])

	useEffect(() => {
		if (localStorage.getItem('slowbro-token') == null) {
			router.replace('/');
		}
		else {
			setLoading(false);
		}
	}, [router])

	



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
		<div  className='overflow-x-hidden min-h-screen flex scroll'>
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
									onOptionClick={(index) => { dispatch(selectProject(taskState.projects[index]._id)) }} />}
							<button
								className={`bg-slate-700 rounded ${taskState.projects.length == 0 ? 'w-full' : ''} flex 
										items-center justify-center`}
								onClick={toggleNewProjectModalVisibility}>
								{taskState.projects.length == 0 && <span>Add Project</span>}	<BsPlus size={30} />
							</button>
						</div>
					</div>
				</div>
				<TodayCompletedTaskList />
				<div className='flex justify-between items-center mb-2'>
					<div className='font-bold text-lg'>Active Task</div>
					<button className='btn-primary flex items-center' 
					onClick={()=>{
						dispatch(selectTask({id:null,type:ListType.pending}));
						}}  >
						Add new task &nbsp; <BsPlus size={20} />
					</button>
				</div>
				{
					activeTask.length==0?
					<div className='bg-slate-800 p-3 rounded'>
						No Active Task
					</div>
:					activeTask.map(tk=><ActiveTile key={tk._id} task={tk} />)
				}
				<TodoList />
				<PreviouslyCompletedTask />
			</div>
			<Sidebar />

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

