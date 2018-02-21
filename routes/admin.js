/*
* @Author: x
* @Date:   2018-02-03 10:53:19
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-20 20:14:13
*/
const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/questions');

router.get('/', (req, res, next) => {
  QuestionModel.getQuestion()
    .then(function(questions) {
      res.render('admin', {
        questions: questions
      });
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  res.send('question');
});

module.exports = router;
