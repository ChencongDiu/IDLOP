/*
* @Author: x
* @Date:   2018-02-03 10:53:19
* @Last Modified by:   x
* @Last Modified time: 2018-02-21 17:27:13
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

router.get('/upload', (req, res, next) => {
  res.render("upload");
});

router.post('/upload', (req, res, next) => {
  const subject_id = parseInt(req.fields.subject_id);
  const set_id = parseInt(req.fields.set_id);
  const session_id = parseInt(req.fields.session_id);
  const question_id = parseInt(req.fields.question_id);
  const question_content = req.fields.question_content;
  const A = req.fields.A;
  const B = req.fields.B;
  const C = req.fields.C;
  const D = req.fields.D;
  const correct_answer = req.fields.correct_answer;

  // validation
  try {
    if (!subject_id) {
      throw new Error('Please Provide Valid Subject Number!')
    }
    if (!set_id) {
      throw new Error('Please Provide Valid Set Number!')
    }
    if (!session_id) {
      throw new Error('Please Provide Valid Session Number!')
    }
    if (!question_id) {
      throw new Error('Please Provide Valid Question Number!')
    }

    if (!question_content) {
      throw new Error('Please Provide Valid Question Content!')
    }
    if (!(A && B && C && D)) {
      throw new Error('Please Provide Options!')
    }
    if (!correct_answer) {
      throw new Error('Please Choose a Correct Answer!')
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  let options = {
    A: A,
    B: B,
    C: C,
    D: D
  }

  let newQuestion = {
    subject_id: subject_id,
    set_id: set_id,
    session_id: session_id,
    question_id: question_id,
    question: question_content,
    options: options,
    correct_answer: correct_answer
  }

  // console.log(newQuestion);

  QuestionModel.create(newQuestion)
    .then((result) => {
      console.log(result);
      req.flash('success', 'Upload Succeeded!');
      res.redirect('/admin');
    })
    .catch((e) => {
      console.log(e.message);
      if (e.message.match('duplicate key')) {
        req.flash('error', 'Duplicated Question Index!');
        return res.redirect('/admin/upload');
      }
      next(e);
    })

  // console.log(subject_id);
  // console.log(set_id);
  // console.log(session_id);
  // console.log(question_id);
  // console.log(question);
  // console.log(options);
  // console.log(correct_answer);
});

router.get('/:questionId/edit', (req, res, next) => {
  const questionId = req.params.questionId;
  res.send("edit page");
});

router.get('/:questionId/remove', (req, res, next) => {
  const questionId = req.params.questionId;

  QuestionModel.getQuestionById(questionId)
    .then(function(question) {
      if (!question) {
        throw new Error('Question Does Not Exist!')
      }
      QuestionModel.deleteQuestionById(questionId)
        .then(function() {
          req.flash('success', 'Delete Succeeded!');
          res.redirect('/admin');
        })
        .catch(next);
    })
});

module.exports = router;
