import Axios from 'axios';
import baseUrl from '../Util/Config';
// import { toast } from '../Utils/Utils';
import history from '../Util/History';
import Response from '../Models/Response';

const http = Axios.create({
	baseURL: baseUrl,
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
});

http.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with request error
		// toast('Error with the server', 'error');
		localStorage.removeItem('token');
		history.push('/');
		return Promise.reject(error);
	}
);
// Add a response interceptor
http.interceptors.response.use(
	function(response) {
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		// localStorage.removeItem('token');
		// history.push('/');
		// window.location.reload();
		return Promise.reject(error);
	}
);

export function setHeaderToken(token: string) {
	http.defaults.headers = { Authorization: 'Bearer ' + token };
}

export function get(url: string, params?: any): Promise<Response<any>> {
	return http.get(url, {params}).then(res => res.data).catch(reason => Promise.reject(new Error(reason.statusText)));
}

export function post(url: string, params?: any): Promise<Response<any>> {
	return http
		.post(url, params)
		.then(res => {return res.data ? res.data : res})
		.catch(reason => {
			return Promise.reject(reason);
		});
}

export function put(url: string, params?: any): Promise<Response<any>> {
	return http
		.put(url, params)
		.then(res => res.data)
		.catch(reason => {
			console.error(reason.message);
		});
}

export function deleteReq(url: string, params?: any): Promise<Response<any>> {
	return http
		.delete(url, params)
		.then(res => res.data)
		.catch(reason => {
			console.error(reason.message);
		});
}
