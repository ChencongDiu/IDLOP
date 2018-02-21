/*
* @Author: x
* @Date:   2018-02-05 12:15:18
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-20 09:59:46
*/

const express = require('express');
const router = express.Router();
const emailValidator = require('email-validator');

const UserModel = require('../models/users');

router.get('/', (req, res, next) => {
  res.render('home');
});

router.post('/', (req, res, next) => {
  const email = req.fields.email;

  // validation
  try {
    if (!emailValidator.validate(email)) {
      throw new Error('Invalid Email Address!');
    }
  } catch(e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  UserModel.getUserByEmail(email)
    .then((user) => {
      if (!user) {
        req.flash('error', 'Email Not Found!');
        return res.redirect('back');
      }
      // succeeded
      req.flash('success', 'Sign In Succeeded!');
      req.session.user = user;
      res.redirect('/subject');
    })
    .catch(next);
});

module.exports = router;
