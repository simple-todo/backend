// ./src/app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes");

const { companyRouter } = require("./routes");
const registerRouter = require("./routes/register");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(helmet());

app.use("/api" + "/company-management", companyRouter);
app.use("/api" + "/user-management", registerRouter);

app.listen(3000, () => {
  console.log("Server listening on port " + 3000);
});

module.exports = app;
