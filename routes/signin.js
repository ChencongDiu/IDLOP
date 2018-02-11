/*
* @Author: x
* @Date:   2018-02-03 10:47:50
* @Last Modified by:   x
* @Last Modified time: 2018-02-05 14:36:01
*/
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('signin page');
});

router.post('/', (req, res, next) => {
	res.send('sign in post');
});

module.exports = router;
