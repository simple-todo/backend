const express = require("express");
const registerRouter = express.Router();
// const { users } = require("../models/index");

registerRouter.post("/register", (req, res) => {
  console.log(req.body);

  // console.log("users: ", users);
  // users.findAll({}).then(result => {
  //   console.log("res ", result);
  //   res.send({ data: result });
  // });
  // // res.send({ nama: "cioko" });
});

module.exports = registerRouter;
