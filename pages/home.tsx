import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/layout/sidebar';
import ActiveTile from '../components/active_tile';
import bugImage from '../public/bug.png'
import DropDownMenu from '../components/layout/drop_down_menu';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { logout } from '../redux/user/user';
import { BsPlus } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Modal from '../components/layout/modal';
import { createProject, getAllProject, getAllPendingTask, deleteProject } from '../redux/task/taskServices';
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
	const [isDeleteProjectModelVisible, setIsDeleteProjectModelVisible] = useState(false);
	const [newProjectName, setNewProjectName] = useState('');
	const selectedProject = useAppSelector(state => state.task.selectedProject);
	const projects = useAppSelector(state => state.task.projects);
	const pendingTask = useAppSelector(state => state.task.pendingTasks);
	let activeTask = pendingTask.filter(tk => tk.project == selectedProject?._id && tk.status == TaskStatus.started);

	useEffect(() => {
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

	function toggleDeleteProjectModelVisibility() {
		setIsDeleteProjectModelVisible(state => !state);
	}

	function onDeleteProject() {
		dispatch<any>(deleteProject({ id: selectedProject!._id }))
		toggleDeleteProjectModelVisibility();
	}

	function onCreateNewProject() {
		dispatch<any>(createProject({ name: newProjectName }));
		toggleNewProjectModalVisibility();
	}

	if (loading) {
		return <div></div>;
	}

	return (
		<div className='overflow-x-hidden min-h-screen flex scroll relative'>
			<div className={`px-3 md:px-0 w-full md:w-1/2 m-auto mt-3 relative `}>
				<div className='absolute right-6 md:right-1 top-3'>
					<button onClick={onLogout}>
						<FiLogOut size={30} />
					</button>
				</div>
				<div className='flex flex-col md:flex-row items-center justify-center mb-7 md:gap-3 '>
					<div>
						<Image src={bugImage} width='100' height={100} alt='bug.png' />
					</div>
					<div>
						<h1 className='text-center text-5xl md:text-6xl font-bold '>Tasks</h1>
						<div className='flex items-center gap-1'>
							{projects.length > 0 &&
								<DropDownMenu
									selectedOption={selectedProject?.name ?? ''}
									Options={projects.map(proj => proj.name)}
									onOptionClick={(index) => { dispatch(selectProject(projects[index]._id)) }} />}
							<button
								className={`bg-slate-700 rounded ${projects.length == 0 ? 'w-full' : ''} flex 
										items-center justify-center`}
								onClick={toggleNewProjectModalVisibility}>
								{projects.length == 0 && <span>Add Project</span>}	<BsPlus size={30} />
							</button>
							{
								projects.length > 0 && <button
									className={`bg-slate-700 rounded items-center justify-center p-1`}
									onClick={toggleDeleteProjectModelVisibility}
								>
									<RiDeleteBin5Line size={23} />
								</button>

							}
						</div>
					</div>
				</div>
				{
					projects.length > 0 ? <div>
						<TodayCompletedTaskList />
						<div className='flex justify-between items-center mb-2'>
							<div className='font-bold text-lg'>Active Task</div>
							<button className='btn-primary flex items-center'
								onClick={() => {
									dispatch(selectTask({ id: null, type: ListType.pending }));
								}}  >
									<span className='hidden md:inline'>
									Add new task  &nbsp;
									</span>
								 <BsPlus size={20} />
							</button>
						</div>
						{
							activeTask.length == 0 ?
								<div className='bg-slate-800 p-3 rounded'>
									No Active Task
								</div>
								: activeTask.map(tk => <ActiveTile key={tk._id} task={tk} />)
						}
						<TodoList />
						<PreviouslyCompletedTask />
					</div>
						: <div className='bg-slate-800 p-3 rounded'>
							No project created
						</div>
				}
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
			{isDeleteProjectModelVisible && <Modal
				isVisible={isDeleteProjectModelVisible}
				onClose={toggleDeleteProjectModelVisibility}
			>
				<div className='w-80'>
					<div className='mb-6'>Are you sure you want to delete {selectedProject!.name} project</div>
					<div>
						<button className='!bg-red-500 btn-primary mr-3 ' onClick={onDeleteProject}>Delete</button>
						<button onClick={toggleDeleteProjectModelVisibility}>cancel</button>
					</div>
				</div>
			</Modal>}
		</div>
	)
}

