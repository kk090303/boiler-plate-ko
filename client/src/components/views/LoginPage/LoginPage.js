import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from'../../../_actions/user_action'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
	const dispatch = useDispatch();

	//���ο��� �����͸� �ٲٱ� ���ؼ��� state�� ��ȭ��������� �׷��⶧����
	//email �� ���� state, password�� ���� state ����
	const [Email, setEmail] = useState("")
	const [Password,setPassword] = useState("")
	//Ÿ������ ���� �� onChange �̺�Ʈ�� �߻��Ͽ� state�� ���ϰ�
	//�� ���� value�� �ٲ�� ��
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
		//email�� onchange�� ���� �Լ� ����
	}
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
		//password�� onchange�� ���� �Լ� ����
	}
	const onSubmitHandler = (event) => {
	//��ư�� ���������� ���ΰ�ħ �Ǵ°��� ������
		event.preventDefault();
		console.log('Email',Email)
		console.log('Password',Password)

		//�������� �������� �ϴ� ����(body)�� axios�� ���� ����
		let body = {
			email : Email,
			password : Password
		}
		//redux���
		dispatch(loginUser(body))
		.then(response=>{
			if(response.payload.loginSuccess){
				props.history.push('/')
			} else {
				alert('Error')
			}
		})

	}


    return (
     <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style ={{display: 'flex',flexDirection: 'column'}}
				onSubmit = {onSubmitHandler}
			>
				<label>Email</label>
				<input type ="email" value={Email} onChange={onEmailHandler} />
				<label>Password</label>
				<input type ="password" value={Password} onChange={onPasswordHandler} />

				<br/>
				<button type='submit'>
					Login
				</button>

			</form>
	</div>
    )
}

export default withRouter(LoginPage);