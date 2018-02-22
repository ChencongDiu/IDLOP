/*
* @Author: x
* @Date:   2018-02-01 22:40:10
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-21 16:13:36
*/

const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const mongolass = new Mongolass();

mongolass.connect(config.mongodb);

// generate creating time by objectid
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
});

// users table
exports.User = mongolass.model('User', {
  email: {type: 'string', required: true}, // unique
  firstname: {type: 'string', required: true},
  lastname: {type: 'string', required: true},
  gender: {type: 'string', enum: ['m', 'f', 'x'], default: 'x'},
  grade: {type: 'number', range: [7, 12]},
  takebefore: {type: 'string', enum: ['y', 'n'], default: 'n'},
  taketime: {type: 'string'}
});
exports.User.index({email: 1}, {unique: true}).exec();

// questions table
exports.Question = mongolass.model('Question', {
  subject_id: {type: 'number', required: true},
  set_id: {type: 'number', required: true},
  session_id: {type: 'number', required: true},
  question_id: {type: 'number', required: true},
  question: {type: 'string', required: true},
  options: {
    A: {type: 'string', required: true},
    B: {type: 'string', required: true},
    C: {type: 'string', required: true},
    D: {type: 'string', required: true}
  },
  correct_answer: {type: 'string', required: true}
});
exports.Question.index({subject_id: 1, set_id: 1, session_id: 1, question_id: 1}, {unique: true}).exec();
