import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

	const dispatch = useDispatch();

	//내부에서 데이터를 바꾸기 위해서는 state를 변화시켜줘야함 그렇기때문에
	//email 을 위한 state, password를 위한 state 선언

	const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

	//타이핑을 했을 때 onChange 이벤트가 발생하여 state가 변하고
	//그 안의 value가 바뀌게 됌
	    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

 const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('ConfirmPassword is not same with Password')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
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
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

				<br/>
				<button type='submit'>
					SIgn IN
				</button>

			</form>
	</div>
    )
}

export default withRouter(RegisterPage);