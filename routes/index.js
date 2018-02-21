/*
* @Author: x
* @Date:   2018-02-03 10:41:22
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-20 14:00:46
*/
module.exports = (app) => {
	app.get('/', (req, res) => {
		res.redirect('/home');
	});
  app.use('/home', require('./home'));
  app.use('/admin', require('./admin'));
  app.use('/subject', require('./subject'));
	app.use('/signup', require('./signup'));
	app.use('/signin', require('./signin'));
	app.use('/question', require('./question'));
};
