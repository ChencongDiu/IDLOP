/*
* @Author: x
* @Date:   2018-02-06 15:55:51
* @Last Modified by:   x
* @Last Modified time: 2018-02-11 14:58:07
*/
const Question = require('../lib/mongo').Question;

module.exports = {
  // get questions by subject_id and set_id
  getQuestionBySubjectAndSetId: function getQuestionBySubjectAndSetId(subject_id, set_id) {
    return Question
      .find({subject_id: subject_id, set_id: set_id})
      .sort({question_id: 1})
      .exec()
  }
};
