import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from'../../../_actions/user_action'
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
	const dispatch = useDispatch();

	//내부에서 데이터를 바꾸기 위해서는 state를 변화시켜줘야함 그렇기때문에
	//email 을 위한 state, password를 위한 state 선언
	const [Email, setEmail] = useState("")
	const [Password,setPassword] = useState("")
	//타이핑을 했을 때 onChange 이벤트가 발생하여 state가 변하고
	//그 안의 value가 바뀌게 됌
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
		//email의 onchange에 대한 함수 정의
	}
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
		//password의 onchange에 대한 함수 정의
	}
	const onSubmitHandler = (event) => {
	//버튼을 누를때마다 새로고침 되는것을 막아줌
		event.preventDefault();
		console.log('Email',Email)
		console.log('Password',Password)

		//서버에서 보내고자 하는 값들(body)을 axios를 통해 보냄
		let body = {
			email : Email,
			password : Password
		}
		//redux사용
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