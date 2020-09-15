import axios from 'axios';
import {
	LOGIN_USER
} from './types';

export function loginUser(dataToSubmit){
	//서버쪽에 생서해놓은 login 라우터로 보내서 처리
		const request = axios.post('/api/users/login',dataToSubmit)
		.then(response=>response.data)

		return {
			type : LOGIN_USER,
			payload: request
		}
}