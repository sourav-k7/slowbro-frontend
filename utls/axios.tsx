import axios from 'axios';
let token = '';
const instance = axios.create({

	// baseURL: 'https://api.yocto.care/api/v1',
	baseURL: process.env.BASE_URL+'/api/v1',
	// baseURL: 'https://3018-182-77-112-107.ngrok.io/api/v1'


});

instance.interceptors.request.use((req) => {
	if (typeof window !== 'undefined')
	token = localStorage.getItem(`yhp-auth`)??'';
	req!.headers!.authorization = `Bearer ${token}`;
	return req;
});

export default instance;
