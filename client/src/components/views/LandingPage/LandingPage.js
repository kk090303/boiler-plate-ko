import React,{useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
//landingPage에 들어오면 이 부분을 실행하겠다.
	useEffect(() =>{
	//서버에 get request를 보내는데 endpoint는 /api/hello 이다
		axios.get('/api/hello')
		.then(response =>console.log(response.data)) //서버에서 돌아온 response를 log로 띄우겠다.
	},[])

	const onClickHandler = () => {
		axios.get('/api/users/logout')
		.then(response =>{
			if(response.data.success){
				props.history.push("login")
			} else{
				alert('logout fail')
			}
		})
	}

    return (
    <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>Start Page</h2>
			<button onClick = {onClickHandler}>
				logout
			</button>
	</div>
    )
}

export default withRouter(LandingPage);