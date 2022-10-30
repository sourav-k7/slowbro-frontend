import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { Doubt, Subtask, Task, TaskStatus } from '../model/task';
import { selectTask } from '../redux/task/task';
import { completeTask, updateTask } from '../redux/task/taskServices';
import { ListType, SelectTaskPayloadType } from '../redux/task/taskTypes';
import DropDownMenu from './layout/drop_down_menu';
import QuestionTile from './layout/question_tile';
import SubtaskTile from './sub_task_tile';

interface PropType {
	task: Task,
}

export default function ActiveTile({ task }: PropType) {
	const selectedProject = useAppSelector(state => state.task.selectedProject);
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState(task.status);
	const [subTask, setSubTask] = useState<Subtask[]>(task.subtask);
	const [doubt, setDoubt] = useState<Doubt[]>(task.doubt);

	useEffect(() => {
		setStatus(task.status);
		setSubTask(task.subtask);
		setDoubt(task.doubt);
	}, [task])




	function handleUpdateTask(field: string, value: any) {

		dispatch<any>(updateTask({
			...task,
			status: status,
			subtask: subTask,
			doubt: doubt,
			[field]: value
		} as Task));
	}

	function removeSubTask(rmTask: Subtask) {
		let latestSubtask: Subtask[] = [];
		setSubTask(state => {
			latestSubtask = state.filter(tk => tk.task != rmTask.task)
			return latestSubtask;
		})
		handleUpdateTask('subtask', latestSubtask);
	}

	function updateSubTask(updateTkId: string, updatedStatus: TaskStatus) {
		let latestSubtask: Subtask[] = [];
		setSubTask(state => {
			latestSubtask = state.map(tk => {
				if (tk._id == updateTkId) {
					let tempSubTk = { ...tk };
					tempSubTk.status = updatedStatus;
					return tempSubTk;
				}
				return tk;
			})
			return latestSubtask;
		})
		handleUpdateTask('subtask', latestSubtask);
	}

	function updateStatus(index: number) {
		const newStatus = Object.values(TaskStatus)[index];
		setStatus(newStatus);
		handleUpdateTask('status', newStatus);
		if (newStatus == TaskStatus.completed) {
			dispatch<any>(completeTask({
				...task,
				status: status,
				subtask: subTask,
				doubt: doubt,
			} as Task));
		}
	}

	function removeDoubt(rmDomain: Doubt) {
		let latestState: Doubt[] = [];
		setDoubt(state => {
			latestState = state.filter(dbt => dbt._id != rmDomain._id)
			return latestState;
		})
		handleUpdateTask('doubt', latestState);
	}

	function updateAnswer(questionId: string, answer: string) {
		let latestState: Doubt[] = [];
		setDoubt(state => {

			latestState = state.map(quest => {
				if (quest._id == questionId) {
					const tempQuestion = { ...quest };
					tempQuestion.answer = answer;
					return tempQuestion;
				}
				return quest;
			})
			return latestState;
		})
		handleUpdateTask('doubt', latestState);
	}


	return (
		<div className='my-3 p-3 bg-slate-800 rounded-md'>
			<Head>
				<meta charSet="UTF-8" />
			</Head>

			<div className='flex justify-between items-center'>
				<div className='text-xl font-semibold'>{task.task}</div>
				<BiEdit size={30}
					className={`cursor-pointer`}
					onClick={() => dispatch(selectTask({ id: task._id, type: ListType.pending } as SelectTaskPayloadType))} />
			</div>
			<div className='text-gray-400 mb-3'>{selectedProject?.name}</div>
			<div className='mb-3 w-32'>
				<DropDownMenu
					selectedOption={task.status}
					Options={Object.values(TaskStatus).map(val => val)}
					onOptionClick={updateStatus} />
			</div>
			<div className='font-semibold '>Description</div>
			<div className='bg-slate-700 mb-3 p-3 rounded'>{task.description!=''?task.description:"No description"}</div>
			{/* <div>Image</div> */}
			<div className='font-semibold'>SubTask</div>
			<div className='bg-slate-700 p-3 rounded mb-3'>
				{subTask.length == 0 ?
					"No subtask"
					: subTask.map(stk => {
						return <SubtaskTile
							key={stk._id}
							title={stk.task}
							status={stk.status}
							bgColor={'bg-slate-600'}
							handleStatusUpdate={(status) => updateSubTask(stk._id, status)}
							onRemove={() => removeSubTask(stk)}
						/>
					})
				}
			</div>

			<div className='font-semibold mb-3'>Points : {task.point} &#128293;</div>
			<div className='font-semibold'>Doubt</div>
			<div className='bg-slate-700 mb-3 p-3 rounded'>
				{
					task.doubt.length == 0 ?
						"No doubt" :
						task.doubt.map(dbt => {
							return <QuestionTile
								key={dbt._id}
								question={dbt.question}
								answer={dbt.answer}
								handleRemove={() => removeDoubt(dbt)}
								handleAnswerUpdate={(answer) => updateAnswer(dbt._id, answer)}
								bgColor={'bg-slate-600'}
							/>
						})

				}
			</div>
			<div className='font-semibold'>Comments</div>
			<div className=" bg-slate-700 mb-1 p-3 rounded">
				{
					task.comments.length == 0 ?
						"No comments" :
						task.comments.map((comment, index) => {
							return (
								<div key={index} className={`py-2 px-2 bg-slate-800 my-1 rounded flex justify-between items-center`}>
									{comment}
									<AiOutlineClose className='cursor-pointer' onClick={() => { }} />
								</div>

							)
						})
				}
			</div>
		</div>
	)
}
