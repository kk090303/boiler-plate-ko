import axios from 'axios';
import {
	LOGIN_USER
} from './types';

export function loginUser(dataToSubmit){
	//�����ʿ� �����س��� login ����ͷ� ������ ó��
		const request = axios.post('/api/users/login',dataToSubmit)
		.then(response=>response.data)

		return {
			type : LOGIN_USER,
			payload: request
		}
}