/*
* @Author: x
* @Date:   2018-02-04 10:50:23
* @Last Modified by:   ChencongDiu
* @Last Modified time: 2018-02-23 23:40:26
*/
const User = require('../lib/mongo.js').User;

module.exports = {
  // create a user
  create: function create(user) {
    return User.create(user).exec();
  },

  // get user by email
  getUserByEmail: function getUserByEmail(email) {
    return User
      .findOne({email: email})
      .addCreatedAt()
      .exec()
  }
};
