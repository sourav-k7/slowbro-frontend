export abstract class ApiConstants {
	static  readonly baseUrl : string = "http://localhost:5000/api/v1";
	//auth
	static readonly loginApi : string =  '/auth/login';
	static readonly registractionApi : string =  '/auth/signup';
	static readonly getProfileApi:string = '/auth/profile';

	//project
	static readonly newProject:string =  '/project/new';
	static readonly getAllProject:string = '/project/all';

	//task
	static readonly getAllTask:string = '/task/all';
	static readonly newTask:string = '/task/new';
}