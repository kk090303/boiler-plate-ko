const mongoose = require('mongoose');

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

//��Ű���� �𵨷� ������
const User = mongoose.model('User',userSchema)

//���� �ٸ� ���Ͽ����� ����ϵ��� ��
module.exports = { User }

