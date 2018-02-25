/*
* @Author: x
* @Date:   2018-02-03 11:20:42
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-24 16:44:28
*/
module.exports = {
	port: 3000,
	session: {
		secret: 'l2s',
		key: 'l2s',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:27017/l2s'
}
