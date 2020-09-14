const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser'); //�ٵ� �ļ��� ������
const cookieParser = require('cookie-parser');

const config = require('./config/key'); //key.js ���Ͽ��� mongoURI�� �������� ����

const { auth } = require('./middleware/auth');
const { User } = require("./models/User"); //������ �������� ���� ���� ������



//application/x-www-form-urIendoded ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.urlencoded({extended: true}));
//application/json ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~ '))


//ȸ�������� ���� ���Ʈ
app.post('/api/users/register',(req,res)=> {
//ȸ�� ���� �� �� �ʿ��� �������� client���� �������� �װ��� �����ͺ��̽��� �־��ش�.
	
	const user = new User(req.body)

	user.save((err,userInfo)=>{
	if(err) return res.json({success: false, err})
	})//�������� user�𵨿� ������ ��(mongodb �Լ�)
	return res.status(200).json({
		seccess:true
	})

})

//�α����� ���� ���Ʈ
app.post('/api/users/login', (req, res) => {
	//1.��û�� �̸����� �����ͺ��̽����� �ִ��� ã�´�.
User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "������ �̸��Ͽ� �ش��ϴ� ������ �����ϴ�."
      })
    }
		//2.��û�� �̸����� �����ͺ��̽��� �ִٸ� ��й�ȣ�� �´� ��й�ȣ ���� Ȯ��
		//User.js ���Ͽ� �ִ� comparePassword�� ���� ���� ��й�ȣ�� ���� ��ȣȭ�� ��й�ȣ�� ��
	    user.comparePassword(req.body.password, (err, isMatch) => {
			 if (!isMatch)
        return res.json({ loginSuccess: false, message: "��й�ȣ�� Ʋ�Ƚ��ϴ�." })
				
		//3. ��й�ȣ���� �´ٸ� ��ū�� �����ϱ�.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

			//��ū�� �����Ѵ�. ���? ��Ű, ���ý��丮�� -> �̹����� ��Ű�� ����
			//��Ű�� �����ϱ� ���ؼ��� ���̺귯���� �ʿ� - cookieparser
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})



//auth �����
app.get('/api/users/auth',auth,(req,res) =>{
	//������� �̵��� ����� �Դٴ� ���� Authentication �� True ��� ��.
	res.status(200).json({
		_id : req.user._id,
		//role = 0 : �Ϲ����� , role !=0 : ������
		isAdmin: req.user.role === 0 ? false : true,
		email: requ.user.email,
		name : req.user.name,
		lastname:req.user.lastname,
		role: req.user.role,
		image:req.user.image
	})
})

app.get('/api/users/logout',auth,(req,res)=>{
User.findOneAndUpdate({_id:req.user._id},
{token:""},(err,user) => {
	if(err) return res.json({success:false,err});
	return res.status(200).send({
		success: true
		})
	})
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))