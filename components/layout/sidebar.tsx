import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { AiOutlineClose } from 'react-icons/ai';
import { Task, Subtask, Doubt, TaskStatus, PriorityType } from '../../model/task';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { completeTask, createTask, deleteTask, updateTask } from '../../redux/task/taskServices';
import { closeSidebar, markAsUncompleteTask } from '../../redux/task/task';
import SubtaskTile from '../sub_task_tile';
import DropDownMenu from './drop_down_menu';
import priorityIcon from './priorityIcon';


export default function Sidebar() {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector(state => state.task.isSidebarOpen);
	const task = useAppSelector(state => state.task.selectedTask);
	let sidebarWidth = 300;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<TaskStatus>(TaskStatus.unstarted);
	const [statusOption, setStatusOption] = useState<TaskStatus[]>([]);
	const [priority, setPriority] = useState<PriorityType>();
	const [subTask, setSubTask] = useState<Subtask[]>([]);
	const [newSubTaskInput, setNewSubtaskInput] = useState('');
	const [point, setPoint] = useState<number>(0);
	const [doubt, setDoubt] = useState<Doubt[]>([]);
	const [newDoubtInput, setNewDoubtInput] = useState('');
	const [comments, setComments] = useState<string[]>([]);
	const [newCommentInput, setNewCommentInput] = useState('');
	const project = useAppSelector(state => state.task.selectedProject);

	if (typeof window !== 'undefined') {
		if(window.innerWidth>=768){
			sidebarWidth = (2 * window.innerWidth) / 5;
		}
		else{
			sidebarWidth = window.innerWidth;
		}
	}

	const sidebarStyle = useSpring({
		width: isSidebarOpen ? sidebarWidth : 0
	});

	useEffect(() => {
		if (task != null) {
			setName(task.task);
			setDescription(task.description);
			setStatus(task.status);
			setSubTask(task.subtask);
			setPoint(task.point);
			setDoubt(task.doubt);
			setComments(task.comments);
			setStatusOption(Object.values(TaskStatus));
			setPriority(task.priority ?? PriorityType.low);
		} else {
			setName('');
			setDescription('');
			setSubTask([]);
			setPoint(0);
			setDoubt([]);
			setComments([]);
			setStatus(TaskStatus.unstarted);
			setStatusOption([TaskStatus.unstarted, TaskStatus.started]);
			setPriority(PriorityType.low);
		}
	}, [isSidebarOpen, task])

	function removeSubTask(rmTask: Subtask) {
		setSubTask(state => state.filter(tk => tk.task != rmTask.task))
	}

	function updateSubTask(updateTkIndex: number, status: TaskStatus) {
		setSubTask(state => {
			let updateState = [...state];
			updateState[updateTkIndex] = {
				...updateState[updateTkIndex],
				status: status
			}
			return updateState;
		})
	}

	function addSubTask() {
		if (newSubTaskInput != '') {
			setSubTask(state => [
				...state,
				{
					task: newSubTaskInput,
					status: TaskStatus.unstarted,
				} as Subtask
			])
			setNewSubtaskInput('');
		}
	}

	function removeDoubt(rmDomain: Doubt) {
		setDoubt(state => state.filter(dbt => dbt.question != rmDomain.question))
	}

	function updateAnswer(questionId: string, answer: string) {
		setDoubt(state => state.map(quest => {
			if (quest._id == questionId) {
				const tempQuestion = { ...quest };
				tempQuestion.answer = answer;
				return tempQuestion;
			}
			return quest;
		}))

	}

	function addDoubt() {
		if (newDoubtInput != '') {
			setDoubt(state => [
				...state,
				{
					question: newDoubtInput,
					answer: '',
				} as Doubt
			])
		}
		setNewDoubtInput('');
	}

	function removeComment(rmComment: string) {
		setComments(state => state.filter(cmt => cmt != rmComment))
	}

	function addComment() {
		setComments(state => [...state, newCommentInput]);
		setNewCommentInput('');
	}

	function createNewTask() {
		dispatch<any>(createTask({
			task: name,
			description,
			subtask: subTask,
			status: status,
			comments,
			doubt,
			point,
			priority,
			project: project!._id,
			orderId: (new Date().getTime()),
		} as Task));
		handleCloseSideBar();
	}

	function handleUpdateTask() {
		dispatch<any>(updateTask({
			_id: task?._id,
			task: name,
			description,
			subtask: subTask,
			status: status,
			comments,
			doubt,
			point,
			priority,
			project: project!._id,
		} as Task));

		if (status == TaskStatus.completed) {
			dispatch<any>(completeTask({
				_id: task?._id,
				task: name,
				description,
				subtask: subTask,
				status: task?.status,
				comments,
				doubt,
				priority,
				point,
				project: project!._id,
			} as Task));
		}

		if (task?.status == TaskStatus.completed && status !== TaskStatus.completed) {
			dispatch<any>(markAsUncompleteTask({
				_id: task!._id,
				task: name,
				description,
				subtask: subTask,
				status: status,
				comments,
				doubt,
				point,
				priority,
				project: project!._id,
			} as Task));
		}

		handleCloseSideBar();
	}

	function handleCloseSideBar() {
		dispatch(closeSidebar());
	}

	function handleDelete() {
		dispatch<any>(deleteTask({ id: task!._id }));
		handleCloseSideBar();
	}



	return (
		<animated.div style={sidebarStyle} className={`overflow-x-auto fixed md:static ${isSidebarOpen?'':'hidden md:inline'}`}>
			<div className='h-full  fixed w-full md:w-2/5 overflow-y-auto bg-gray-900 py-3 px-5 no-scrollbar'>
				<div>
					<AiOutlineClose color='white' size={25} className="ml-auto mr-0 cursor-pointer" onClick={handleCloseSideBar} />
				</div>
				<div className='font-semibold text-lg mb-2'>Task Name</div>
				<textarea className='multiline-input-field mb-7 w-full'
					onChange={(event) => { setName(event.target.value) }}
					value={name}
				/>
				<div className='font-semibold text-lg mb-2'>Description</div>
				<textarea className='multiline-input-field mb-7 w-full' onChange={(event) => { setDescription(event.target.value) }}
					value={description}
				/>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-4 items-center mb-7 text-lg'>
					<div className='flex items-center'>
						<span className='font-semibold'>Status&nbsp;:&nbsp;</span>
						<DropDownMenu selectedOption={status?.toString()}
							Options={statusOption}
							onOptionClick={(index) => { setStatus(statusOption[index]) }} />
					</div>
					<div className='flex items-center'>
						<span className='font-semibold'>Priority&nbsp;:&nbsp;</span>
						<DropDownMenu selectedOption={
							<span className='flex items-center'>
								{priorityIcon(priority)}&ensp;{priority}</span>
						}
							Options={Object.values(PriorityType)}
							onOptionClick={(index) => { setPriority(Object.values(PriorityType)[index]) }} />
					</div>
				</div>
				<div className='font-semibold text-lg mb-2'>Subtask</div>
				<div>
					{
						subTask.map((tk, index) =>
							<SubtaskTile
								key={index}
								title={tk.task}
								status={tk.status}
								onRemove={() => removeSubTask(tk)}
								bgColor={'bg-slate-800'}
								handleStatusUpdate={(status) => updateSubTask(index, status)}
							/>
						)
					}
				</div>
				<div className='flex flex-col mb-7 items-end'>
					<textarea className='multiline-input-field w-full' placeholder='Enter Subtask'
						onChange={(event) => { setNewSubtaskInput(event.target.value) }}
						value={newSubTaskInput}
					/>
					<button
						className='btn-primary py-1 mt-3 w-full'
						onClick={addSubTask}
					>
						Add Subtask
					</button>
				</div>


				<div className='font-semibold text-lg mb-2'>Doubt</div>
				<div>
					{
						doubt.map((dbt, index) => {
							// return <QuestionTile
							// 	key={index}
							// 	question={dbt.question}
							// 	answer={dbt.answer}
							// 	bgColor={'bg-slate-700'}
							// 	handleRemove={() => removeDoubt(dbt)}
							// 	handleAnswerUpdate={(answer) => { updateAnswer(dbt._id, answer) }}
							// />
							return <InputTile key={index} inputValue={dbt.question} onRemove={() => removeDoubt(dbt)} />

						})
					}
				</div>
				<div className='flex flex-col items-end mb-7'>
					<textarea className='multiline-input-field w-full'
						placeholder='Enter Question'
						onChange={(event) => setNewDoubtInput(event.target.value)}
						value={newDoubtInput}
					/>
					<button className='btn-primary mt-3 w-full' onClick={addDoubt}>
						Add Question
					</button>
				</div>
				<div className='font-semibold text-lg mb-2'>Comment</div>
				<div>
					{
						comments.map((cmt, index) => {
							return <InputTile key={index} inputValue={cmt} onRemove={() => removeComment(cmt)} />
						})
					}
				</div>
				<input placeholder='Enter comment' className='input-field w-full' value={newCommentInput} onChange={(event) => setNewCommentInput(event.target.value)} />
				<button className='btn-primary py-1 mt-3 w-full mb-7' onClick={addComment}>
					Add comment
				</button>

				<div className='font-semibold flex items-center mb-8 text-lg'>
					Point&nbsp;:&nbsp;
					<input
						className='input-field w-1/2 md:w-14'
						type='text'
						pattern="[0-9]*"
						value={point}
						onChange={(event) => {
							if (event.target.validity.valid) {
								setPoint(+event.target.value)
							}
							else {
								setPoint(0);
							}
						}}
					/>
				</div>

				<div className='flex justify-between items-center'>
					<div>
						{
							task == null
								? <button className='btn-primary mr-3' onClick={createNewTask}>Create</button>
								: <button className='btn-primary mr-3' onClick={handleUpdateTask}>Save</button>
						}
						<button onClick={handleCloseSideBar}>Cancel</button>
					</div>
					{task != null && <button
						className='bg-red-500 text-white py-2 rounded px-3'
						onClick={handleDelete}
					>
						Delete
					</button>}
				</div>
			</div>
		</animated.div>
	)
}



function InputTile({ inputValue, onRemove }: { inputValue: string, onRemove: () => void }) {
	return (
		<div className={`py-2 px-2 bg-slate-800 my-1 rounded flex justify-between items-center`}>
			{inputValue}
			<AiOutlineClose size={20} className='cursor-pointer' onClick={onRemove} />
		</div>
	)
}
