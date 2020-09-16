import React,{useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {
//landingPage�� ������ �� �κ��� �����ϰڴ�.
	useEffect(() =>{
	//������ get request�� �����µ� endpoint�� /api/hello �̴�
		axios.get('/api/hello')
		.then(response =>console.log(response.data)) //�������� ���ƿ� response�� log�� ���ڴ�.
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