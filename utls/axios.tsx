import axios from 'axios';
import { ApiConstants } from './api_constant';
let token = '';
const instance = axios.create({
	baseURL : ApiConstants.baseUrl ,
});

instance.interceptors.request.use((req) => {
	if (typeof window !== 'undefined')
	token = localStorage.getItem(`slowbro-token`)??'';
	req!.headers!.authorization = `Bearer ${token}`;
	return req;
});

export default instance;
