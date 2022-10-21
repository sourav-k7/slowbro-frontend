import { Project } from "../../model/project";
import { Task } from "../../model/task";

export interface TaskStateType {
	isSidebarOpen:boolean,
	todayCompleted: Task[],
	previouslyCompletedTask: Task[],
	pendingTasks: Task[],
	projects: Project[],
	loading: Boolean,
	error: String | null,
	selectedTask: Task | null | undefined,
	selectedProject:Project|null|undefined,
}

export interface CreateProjectType {
	name: string,
}


