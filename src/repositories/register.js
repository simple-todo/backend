const { users } = require("../models/index");

class RegisterRepo {
  async addUser(newUserProfile, transaction) {
    return users.findOrCreate({
      where: { username: newUserProfile.username },
      defaults: newUserProfile,
      raw: true,
      logging: false,
      transaction
    });
  }
}

module.exports = RegisterRepo;
