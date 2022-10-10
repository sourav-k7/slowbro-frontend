export interface Task{
	task:String,
	description:String,
	img_url:String,
	subtask:Subtask[],
	status:TaskStatus,
	completionTime:String,
	point:Number,
	doubt:Doubt[],
	comment:String[],
	project:String,
}

export interface Doubt{
	question:String,
	answer?:String,
}

export interface Subtask{
	task:String,
	status:TaskStatus,
}

export enum TaskStatus{
	unstarted,
	started,
	completed
}