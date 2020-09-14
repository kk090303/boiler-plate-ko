//비밀 정보 관리 중 production 모드에서의 방식

module.exports = {
	mongoURI: process.env.MONGO_URI //heroku 랑 통일
}