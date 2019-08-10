const { users } = require("../models/index");

class RegisterRepo {
  async addUser() {
    return users.findAll({});
  }
}

module.exports = RegisterRepo;
