export abstract class ApiConstants {
	// static  readonly baseUrl : string = "http://localhost:5000/api/v1";
	static  readonly baseUrl : string = "https://slowbro-backend.vercel.app/api/v1";
	//auth
	static readonly loginApi : string =  '/auth/login';
	static readonly registractionApi : string =  '/auth/signup';
	static readonly getProfileApi:string = '/auth/profile';

	//project
	static readonly newProject:string =  '/project/new';
	static readonly getAllProject:string = '/project/all';
	static readonly deleteProject:string = '/project/delete';

	//task
	static readonly getAllPendingTask:string = '/task/pending';
	static readonly newTask:string = '/task/new';
	static readonly updateTask:string = '/task/update';
	static readonly swapTask:string = '/task/swap';
	static readonly getAllTodayCompletedTask:string = '/task/today';
	static readonly markTaskAsComplete:string = '/task/complete';
	static readonly getAllPreviouslyCompletedTask:string='/task/previous';
	static readonly deleteTask:string ='/task/delete';
}