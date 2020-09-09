const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name:{ //유저이름
		type : String, 
		maxlength: 50 //최대길이
	},
	email:{
		type: String,
		trim: true,  //sa mp le@email.net -> sample@email.net 띄어쓰기 삭제
		unique: 1  //똑같은 이메일은 못쓰도록 함
	},
	password:{
		type: String,
		minlength:5
	},
	lastname:{
		type: String,
		maxlength : 50
	},
	role: { //일반유저, 관리자유저 구분
		type: Number,
		default: 0
	},
	image: String,
	token:{ //유효성 관리
		type: String
	},
	tokenExp:{ //토큰 유효기간
		type: Number
	}
})

//스키마를 모델로 감싸줌
const User = mongoose.model('User',userSchema)

//모델을 다른 파일에서도 사용하도록 함
module.exports = { User }

