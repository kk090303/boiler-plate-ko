const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
	name:{ //�����̸�
		type : String, 
		maxlength: 50 //�ִ����
	},
	email:{
		type: String,
		trim: true,  //sa mp le@email.net -> sample@email.net ���� ����
		unique: 1  //�Ȱ��� �̸����� �������� ��
	},
	password:{
		type: String,
		minlength:5
	},
	lastname:{
		type: String,
		maxlength : 50
	},
	role: { //�Ϲ�����, ���������� ����
		type: Number,
		default: 0
	},
	image: String,
	token:{ //��ȿ�� ����
		type: String
	},
	tokenExp:{ //��ū ��ȿ�Ⱓ
		type: Number
	}
})

userSchema.pre('save',function(next){
//��й�ȣ ��ȣȭ �۾�
	var user = this;
//��й�ȣ�� �ٲ���� ���� ��й�ȣ�� ��ȣȭ ���ش�.
if(user.isModified('password')){
bcrypt.genSalt(saltRounds, function(err, salt) {
    //salt�� ����� ������ ��� ���� ��й�ȣ�� user.password�� ������ ������ salt�� ����
	//hash�� ��ȣȭ�� password�� ��
    bcrypt.hash(user.password, salt, function(err, hash) {
	//hash ������ �������� ��� ���� user���� ��й�ȣ�� hashȭ�� ��й�ȣ�� ��ü
		if(err)return next(err)
        user.password = hash
		next()
    })
})
}else{
	next() //��й�ȣ ��ü�� �ƴ� ��쿡 �״�� ���� ����
}
})
//index.js���� user���� save�ϱ� ���� ���ϴ� �Լ�



userSchema.methods.comparePassword = function(plainPassword,cb){
	//palinPassword 1234567   ��ȣȭ�� ��й�ȣ $2b$10$mbxPdE1c53H83f4kzMKSz.Zr0y6XqrgKFmYztDABhvm6S/cT6VCjW
	//plainPassword�� ��ȣȭ�ؼ� ��
	bcrypt.compare(plainPassword,this.password,function(err,isMatch){
		if(err) return cb(err);
		cb(null,isMatch);
	})
}

userSchema.methods.generateToken = function(cb){
	//jsonwebtoken�� �̿��ؼ� token�� �����ϱ�

	var user = this;
	var token = jwt.sign(user._id.toHexString(), 'secretToken')

	//user._id +'secretToken'=token
	//->
	//'secretToken' -> user._id
	user.token = token
	user.save(function(err,user){
		if(err) return cb(err);
		cb(null,user);
	})
}

//��Ű���� �𵨷� ������
const User = mongoose.model('User',userSchema)

//���� �ٸ� ���Ͽ����� ����ϵ��� ��
module.exports = { User }

