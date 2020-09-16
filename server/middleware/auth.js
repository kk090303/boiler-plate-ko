
const { User }= require('../models/User');

let auth = (req, res, next) => {
//���� ó���� �ϴ� ��
	//1. Ŭ���̾�Ʈ ��Ű���� ��ū�� �����´�.
	let token = req.cookies.x_auth;

	//2. ��ū�� ��ȣȭ �� �� �ش��ϴ� ������ ã�´�.
	  User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

	//user�� token ������ reqest�� �־���
	  req.token = token;
        req.user = user;
        next();
    })
	//3. ������ ������ ���� Okey
	//3-1 ������ ������ ���� No

}

module.exports = {auth};