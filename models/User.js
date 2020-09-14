const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


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


userSchema.pre('save', function (next) {//비밀번호 암호화 작업
    var user = this;
    if (user.isModified('password')) {
        //비밀번호가 바뀌었을 때만 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
		   //salt를 제대로 생성한 경우 들어온 비밀번호를 user.password에 들어오고 생성한 salt가 들어가고
			//hash에 암호화된 password가 들어감
            if (err) return next(err)
			//hash 생성에 성공했을 경우 현재 user모델의 비밀번호를 hash화된 비밀번호로 교체
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next() //비밀번호 교체가 아닌 경우에 그대로 다음 진행
    }
})
//index.js에서 user모델을 save하기 전에 행하는 함수


userSchema.methods.comparePassword = function (plainPassword, cb) {

    //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    //plainPassword를 암호화해서 비교
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    // console.log('user._id', user._id)
    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token,cb){
	var user = this;
	//토큰을 decode 한다.
	jwt.verify(token,'secretToken',function(err,decoded){
	//유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
	user.findOne({"_id": decoded, "token": token},function(err,user){
		if(err) return cb(err);
		cb(null,user)
	})
	})
}


//스키마를 모델로 감싸줌
const User = mongoose.model('User',userSchema)

//모델을 다른 파일에서도 사용하도록 함
module.exports = { User }

