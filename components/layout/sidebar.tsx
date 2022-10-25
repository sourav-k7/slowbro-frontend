import React, { useEffect, useState } from 'react'
import { animated, update, useSpring } from 'react-spring'
import { AiOutlineClose } from 'react-icons/ai';
import { Task, Subtask, Doubt, TaskStatus } from '../../model/task';
import QuestionTile from './question_tile';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { completeTask, createTask, updateTask } from '../../redux/task/taskServices';
import { closeSidebar, markAsUncompleteTask } from '../../redux/task/task';
import SubtaskTile from '../sub_task_tile';
import DropDownMenu from './drop_down_menu';



export default function Sidebar() {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector(state => state.task.isSidebarOpen);
	const task = useAppSelector(state => state.task.selectedTask);
	let sidebarWidth = 300;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<TaskStatus>(TaskStatus.unstarted);
	const [statusOption, setStatusOption] = useState<TaskStatus[]>([]);
	const [subTask, setSubTask] = useState<Subtask[]>([]);
	const [newSubTaskInput, setNewSubtaskInput] = useState('');
	const [point, setPoint] = useState<number>(0);
	const [doubt, setDoubt] = useState<Doubt[]>([]);
	const [newDoubtInput, setNewDoubtInput] = useState('');
	const [comments, setComments] = useState<string[]>([]);
	const [newCommentInput, setNewCommentInput] = useState('');
	const project = useAppSelector(state => state.task.selectedProject);

	if (typeof window !== 'undefined') {
		sidebarWidth = (2 * window.innerWidth) / 5;
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
			setStatusOption(Object.values(TaskStatus).map(val => val));
		} else {
			setName('');
			setDescription('');
			setSubTask([]);
			setPoint(0);
			setDoubt([]);
			setComments([]);
			setStatusOption([TaskStatus.unstarted, TaskStatus.started]);
		}

	}, [isSidebarOpen, task])

	function removeSubTask(rmTask: Subtask) {
		setSubTask(state => state.filter(tk => tk.task != rmTask.task))
	}

	function updateSubTask(updateTkId: string, status: TaskStatus) {
		setSubTask(state => state.map(tk => {
			if (tk._id == updateTkId) {
				let tempSubTk = { ...tk };
				tempSubTk.status = status;
				return tempSubTk;
			}
			return tk;
		}))
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
			project: project!._id,
			orderId: (new Date().getTime()),
		} as Task));
		closeSideBar();
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
			project: project!._id,
		} as Task));
		if (status == TaskStatus.completed) {
			dispatch<any>(completeTask({ taskId: task!._id }));
		}

		if (task?.status != status) {
			dispatch<any>(markAsUncompleteTask({
				_id: task!._id,
				task: name,
				description,
				subtask: subTask,
				status: status,
				comments,
				doubt,
				point,
				project: project!._id,
			} as Task));
		}

		closeSideBar();
	}

	function closeSideBar() {
		dispatch(closeSidebar());
	}

	return (
		<animated.div style={sidebarStyle} className={`overflow-x-auto relative`}>
			<div className='h-full fixed w-2/5 overflow-y-auto bg-gray-900 p-3 no-scrollbar'>
				<div>
					<AiOutlineClose color='white' size={25} className="ml-auto mr-0 cursor-pointer" onClick={closeSideBar} />
				</div>
				<div className='font-semibold text-lg'>Task Name</div>
				<textarea className='multiline-input-field mb-3 w-full'
					onChange={(event) => { setName(event.target.value) }}
					value={name}
				/>
				<div className='font-semibold text-lg'>Description</div>
				<textarea className='multiline-input-field mb-3 w-full' onChange={(event) => { setDescription(event.target.value) }}
					value={description}
				/>
				<div className='w-32 mb-3'>
					<DropDownMenu selectedOption={status?.toString()}
						Options={statusOption}
						onOptionClick={(index) => { setStatus(statusOption[index]) }} />
				</div>
				<div className='font-semibold text-lg'>Subtask</div>
				<div>
					{
						subTask.map((tk, index) =>
							<SubtaskTile
								key={index}
								title={tk.task}
								status={tk.status}
								onRemove={() => removeSubTask(tk)}
								bgColor={'bg-slate-800'}
								handleStatusUpdate={(status) => updateSubTask(tk._id, status)}
							/>
						)
					}
				</div>
				<div className='flex flex-col items-start mb-3'>
					<textarea className='multiline-input-field w-full' placeholder='Enter Subtask'
						onChange={(event) => { setNewSubtaskInput(event.target.value) }}
						value={newSubTaskInput}
					/>
					<button
						className='bg-slate-800 px-3 py-1 mt-2 rounded'
						onClick={addSubTask}
					>
						Add Subtask
					</button>
				</div>


				<div className='font-semibold text-lg'>Doubt</div>
				<div>
					{
						doubt.map((dbt, index) => {
							return <QuestionTile
								key={index}
								question={dbt.question}
								answer={dbt.answer}
								bgColor={'bg-slate-700'}
								handleRemove={() => removeDoubt(dbt)}
								handleAnswerUpdate={(answer) => { updateAnswer(dbt._id, answer) }}
							/>

						})
					}
				</div>
				<div className='flex flex-col items-start mb-3'>
					<textarea className='multiline-input-field w-full'
						placeholder='Enter Question'
						onChange={(event) => setNewDoubtInput(event.target.value)}
						value={newDoubtInput}
					/>
					<button className='bg-slate-800 px-3 py-1 mt-2 rounded' onClick={addDoubt}>
						Add Question
					</button>
				</div>
				<div className='font-semibold text-lg'>Comment</div>
				<div>
					{
						comments.map((cmt, index) => {
							return <InputTile key={index} inputValue={cmt} onRemove={() => removeComment(cmt)} />
						})
					}
				</div>
				<input placeholder='Enter comment' className='input-field w-full mb-2' value={newCommentInput} onChange={(event) => setNewCommentInput(event.target.value)} />
				<button className='bg-slate-800 px-3 py-1 mb-3 rounded' onClick={addComment}>
					Add comment
				</button>

				<div className='font-semibold flex items-center mb-4 text-lg'>Point&nbsp;:&nbsp;
					<input
						className='input-field w-14'
						value={point}
						onChange={(event) => setPoint(+event.target.value)}
					/>
				</div>

				<div>
					{
						task == null
							? <button className='btn-primary mr-3' onClick={createNewTask}>Create</button>
							: <button className='btn-primary mr-3' onClick={handleUpdateTask}>Save</button>
					}
					<button>cancel</button>
				</div>
			</div>
		</animated.div>
	)
}



function InputTile({ inputValue, onRemove }: { inputValue: string, onRemove: () => void }) {
	return (
		<div className={`py-2 px-2 bg-slate-800 my-1 rounded flex justify-between items-center`}>
			{inputValue}
			<AiOutlineClose className='cursor-pointer' onClick={onRemove} />
		</div>
	)
}
