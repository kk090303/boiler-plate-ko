const express = require('express')
const app = express()

const bodyParser = require('body-parser'); //바디 파서를 가져옴
const cookieParser = require('cookie-parser');

const config = require('./config/key'); //key.js 파일에서 mongoURI를 가져오기 위함

const { auth } = require('./middleware/auth');
const { User } = require("./models/User"); //이전에 만들어놓은 유저 모델을 가져옴


//application/x-www-form-urIendoded 형태의 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
//application/json 형태의 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~ '))

app.get('/api/hello',(req,res)=>{
	res.send("안녕하세요")
})


//회원가입을 위한 라우트
app.post('/api/users/register',(req,res)=> {
//회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것을 데이터베이스에 넣어준다.
	
	const user = new User(req.body)

	user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

//로그인을 위한 라우트
app.post('/api/users/login', (req, res) => {
	//1.요청된 이메일을 데이터베이스에서 있는지 찾는다.
User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
		//2.요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
		//User.js 파일에 있는 comparePassword를 통해 들어온 비밀번호랑 기존 암호화된 비밀번호랑 비교
	    user.comparePassword(req.body.password, (err, isMatch) => {
			 if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
				
		//3. 비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

			//토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 -> 이번에는 쿠키에 저장
			//쿠키에 저장하기 위해서는 라이브러리가 필요 - cookieparser
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})


// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

//로그아웃 라우터
app.get('/api/users/logout',auth,(req,res)=>{
User.findOneAndUpdate({_id:req.user._id},
{token:""},(err,user) => {
	if(err) return res.json({success:false,err});
	return res.status(200).send({
		success: true
		})
	})
})


const port = 4000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))