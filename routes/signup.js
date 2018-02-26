/*
* @Author: x
* @Date:   2018-02-03 10:50:36
* @Last Modified by:   x
* @Last Modified time: 2018-02-25 17:56:18
*/
const fs = require('fs');
const path = require('path');
const emailValidator = require('email-validator');
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');

router.get('/', (req, res, next) => {
	res.render('signup');
});

router.post('/', (req, res, next) => {
  const email = req.fields.email;
  const firstname = req.fields.firstname;
  const lastname = req.fields.lastname;
  const gender = req.fields.gender;
  const grade = parseInt(req.fields.grade);
  const takebefore = req.fields.takebefore;
  /*var taketime = req.fields.taketime;
  console.log('email: ' + email + ', type: ' + typeof(email));
  console.log('firstname: ' + firstname + ', type: ' + typeof(firstname));
  console.log('lastname: ' + lastname + ', type: ' + typeof(lastname));
  console.log('gender: ' + gender + ', type: ' + typeof(gender));
  console.log('grade: ' + grade + ', type: ' + typeof(grade));
  console.log('takebefore: ' + takebefore + ', type: ' + typeof(takebefore));
  console.log('taketime: ' + taketime + ', type: ' + typeof(taketime));*/
  // check validation
  try {
    if (!emailValidator.validate(email)) {
      throw new Error('Invalid Email Address!');
    }
    if (!firstname.length >= 1) {
      throw new Error('Invalid Firstname!');
    }
    if (!lastname.length >= 1) {
      throw new Error('Invalid Lastname!');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('Please Choose a Gender!');
    }
    if (!(grade >= 7 && grade <= 12)) {
      throw new Error('Please Choose a Grade!');
    }
    if (takebefore === 'y') {
      if (taketime === '') {
        throw new Error('Please Choose a Date!');
      }
    } else if (takebefore === 'n') {
      taketime = '';
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/signup');
  }

  // create a user object
  let user = {
    email: email,
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    grade: grade,
    takebefore: takebefore,
    taketime: taketime
  }

  // create a tuple in database
  UserModel.create(user)
    .then((result) => {
      const sessionUser = result.ops[0];
      // console.log(sessionUser);
      req.session.user = sessionUser;
      req.flash('success', 'Sign Up Succeeded!');
      res.redirect('/subject');
    })
    .catch((e) => {
      // console.log(e.message);
      if (e.message.match('duplicate key')) {
        req.flash('error', 'This Email Address Has Already Been Used!');
        return res.redirect('/signup');
      }
      next(e);
    })
});

module.exports = router;
