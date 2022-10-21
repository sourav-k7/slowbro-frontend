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
	project:Project,
	orderId:number,
}

export interface Doubt{
	question:string,
	answer?:string,
}

export interface Subtask{
	task:string,
	status:TaskStatus,
}

export enum TaskStatus{
	unstarted='unstarted',
	started='started',
	completed='completed'
}