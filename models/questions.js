/*
* @Author: x
* @Date:   2018-02-06 15:55:51
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-20 20:26:59
*/
const Question = require('../lib/mongo').Question;

module.exports = {
  // get all questions
  getQuestion: function getQuestion() {
    return Question
      .find()
      .sort({subject_id: 1, set_id: 1, session_id: 1, question_id: 1})
      .exec()
  },

  // get questions by subject_id and set_id
  getQuestionBySubjectSetSession: function getQuestionBySubjectSetSession(subject_id, set_id, session_id) {
    return Question
      .find({subject_id: subject_id, set_id: set_id, session_id: session_id})
      .sort({question_id: 1})
      .exec()
  }
};
