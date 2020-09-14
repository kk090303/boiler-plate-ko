//dev vs prod 모드 중에 어떤 모드인지 고르는 환경변수

if(process.env.NODE_ENV === 'production'){
	module.exports = require('./prod');
}else {
	module. exports = require('./dev');
}