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
    <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>Start Page</h2>
	</div>
    )
}

export default LandingPage;