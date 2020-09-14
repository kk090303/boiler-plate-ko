import React,{useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
//landingPage에 들어오면 이 부분을 실행하겠다.
	useEffect(() =>{
	//서버에 get request를 보내는데 endpoint는 /api/hello 이다
		axios.get('/api/hello')
		.then(response =>console.log(response.data)) //서버에서 돌아온 response를 log로 띄우겠다.
	},[])
    return (
    <div>
	LandingPage
	</div>
    )
}

export default LandingPage;