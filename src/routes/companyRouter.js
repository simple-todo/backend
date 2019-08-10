// ./lib/routes/index.js
const express = require("express");
const companyRouter = express.Router();

// const { companyController } = require("../controllers");

// Add more routes here if you want!
companyRouter.get("/", (req, res) => {
  res.send({ nama: "cioko" });
});

module.exports = companyRouter;
