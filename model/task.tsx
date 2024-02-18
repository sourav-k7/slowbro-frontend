
export interface Task {
	_id: string,
	task: string,
	description: string,
	img_url: string,
	subtask: Subtask[],
	status: TaskStatus,
	priority: PriorityType,
	completionTime: string,
	point: number,
	doubt: Doubt[],
	comments: string[],
	project: string,
	orderId: number,
	links: Link[]
}


export interface Doubt {
	_id: string,
	question: string,
	answer?: string,
}

export interface Link {
	_id: string,
	title: string,
	path: string,
}

export interface Subtask {
	_id: string,
	task: string,
	status: TaskStatus,
}

export enum TaskStatus {
	unstarted = 'unstarted',
	started = 'started',
	completed = 'completed'
}

export enum PriorityType {
	low = 'low',
	medium = 'medium',
	high = 'high'
}