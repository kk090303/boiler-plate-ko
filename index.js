const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser'); //바디 파서를 가져옴

const config = require('./config/key'); //key.js 파일에서 mongoURI를 가져오기 위함

const { User } = require("./models/User"); //이전에 만들어놓은 유저 모델을 가져옴

//application/x-www-form-urIendoded 형태의 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
//application/json 형태의 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
	useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! nodemon')
})

//회원가입을 위한 라우트
app.post('/register',(req,res)=> {
//회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것을 데이터베이스에 넣어준다.
	
	const user = new User(req.body)

	user.save((err,userInfo)=>{
	if(err) return res.json({success: false, err})
	})//정보들이 user모델에 저장이 됌(mongodb 함수)
	return res.status(200).json({
		seccess:true
	})

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})