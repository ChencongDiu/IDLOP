/*
* @Author: x
* @Date:   2018-02-03 10:53:19
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-25 19:22:58
*/
const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/questions');

router.get('/', (req, res, next) => {
  const subject_id = req.session.question.subject_id;
  const set_id = req.session.question.set_id;
  const session_id = req.session.question.session_id;

  QuestionModel.getQuestionBySubjectSetSession(subject_id, set_id, session_id)
    .then(function(questions) {
      res.render('question', {
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
