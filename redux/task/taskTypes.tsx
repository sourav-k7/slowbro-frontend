import { Project } from "../../model/project";
import { Task } from "../../model/task";

export interface TaskStateType {
	isSidebarOpen:boolean,
	todayCompleted: Task[],
	previouslyCompletedTask: Task[],
	pendingTasks: Task[],
	projects: Project[],
	loading: Boolean,
	selectedTask: Task | null | undefined,
	selectedProject:Project|null|undefined,
}

export interface CreateProjectType {
	name: string,
}

export interface SelectTaskPayloadType{
	id:string | null,
	type:ListType
}

export interface TaskSwapType{
	dragTaskId:string,
	dropTaskId:string,
	type:ListType
}

export enum ListType {
	pending = 'pending',
	today = 'today',
	previous = 'previos'
}