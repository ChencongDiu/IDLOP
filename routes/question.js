/*
* @Author: x
* @Date:   2018-02-03 10:53:19
* @Last Modified by:   x
* @Last Modified time: 2018-02-10 17:55:21
*/
const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/questions');

router.get('/', (req, res, next) => {
  const subject_id = req.session.question.subject_id;
  const set_id = req.session.question.set_id;

  QuestionModel.getQuestionBySubjectAndSetId(subject_id, set_id)
    .then(function(questions) {
      res.render('question1', {
        questions: questions
      });
      //console.log(questions);
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
	res.send('question');
});

module.exports = router;
