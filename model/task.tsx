import { Project } from "./project";

export interface Task{
	_id:string,
	task:string,
	description:string,
	img_url:string,
	subtask:Subtask[],
	status:TaskStatus,
	completionTime:string,
	point:number,
	doubt:Doubt[],
	comments:string[],
	project:string,
	orderId:number,
}

export interface Doubt{
	_id:string,
	question:string,
	answer?:string,
}

export interface Subtask{
	_id:string,
	task:string,
	status:TaskStatus,
}

export enum TaskStatus{
	unstarted='unstarted',
	started='started',
	completed='completed'
}