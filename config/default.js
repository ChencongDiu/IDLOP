/*
* @Author: x
* @Date:   2018-02-03 11:20:42
* @Last Modified by:   x
* @Last Modified time: 2018-02-03 11:22:14
*/
module.exports = {
	port: 3000,
	session: {
		secret: 'idlop',
		key: 'idlop',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/idlop'
}