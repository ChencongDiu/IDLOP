/*
* @Author: x
* @Date:   2018-02-05 15:35:22
* @Last Modified by:   x
* @Last Modified time: 2018-02-20 17:16:47
*/
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('subject');
});

router.post('/', (req, res, next) => {
  // math: 1; verbal: 2; writing: 3
  const subject = parseInt(req.fields.subject);
  let question = {
    subject_id: subject,
    set_id: 1,
    session_id: 1
  }
  req.session.question = question;
  res.redirect('/question');
});

module.exports = router;
