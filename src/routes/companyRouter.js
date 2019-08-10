const express = require("express");
const companyRouter = express.Router();
const { users } = require("../models/index");

companyRouter.get("/", (req, res) => {
  console.log("users: ", users);
  users.findAll({}).then(result => {
    console.log("res ", result);
    res.send({ data: result });
  });
  // res.send({ nama: "cioko" });
});

module.exports = companyRouter;
