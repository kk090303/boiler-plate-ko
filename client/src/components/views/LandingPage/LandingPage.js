import React,{useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
//landingPage�� ������ �� �κ��� �����ϰڴ�.
	useEffect(() =>{
	//������ get request�� �����µ� endpoint�� /api/hello �̴�
		axios.get('/api/hello')
		.then(response =>console.log(response.data)) //�������� ���ƿ� response�� log�� ���ڴ�.
	},[])
    return (
    <div>
	LandingPage
	</div>
    )
}

export default LandingPage;