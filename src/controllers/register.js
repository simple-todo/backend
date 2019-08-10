const jwt = require("jsonwebtoken");

const RegisterServices = require("../services/register");

class RegisterController {
  constructor() {
    this.registerServices = new RegisterServices();
  }

  async addUser(req, res, next) {
    const { username, password, full_name } = req.body;
    let token = jwt.sign({ username, password, full_name }, "todosKredivo", {
      expiresIn: "24h" // expires in 24 hours
    });
    const insertNewUser = await this.registerServices.addUser();

    res.send({ nama: token });
  }
}

module.exports = RegisterController;
