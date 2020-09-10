const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser'); //�ٵ� �ļ��� ������

const config = require('./config/key'); //key.js ���Ͽ��� mongoURI�� �������� ����

const { User } = require("./models/User"); //������ �������� ���� ���� ������

//application/x-www-form-urIendoded ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.urlencoded({extended: true}));
//application/json ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
	useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! nodemon')
})

//ȸ�������� ���� ���Ʈ
app.post('/register',(req,res)=> {
//ȸ�� ���� �� �� �ʿ��� �������� client���� �������� �װ��� �����ͺ��̽��� �־��ش�.
	
	const user = new User(req.body)

	user.save((err,userInfo)=>{
	if(err) return res.json({success: false, err})
	})//�������� user�𵨿� ������ ��(mongodb �Լ�)
	return res.status(200).json({
		seccess:true
	})

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})