// ./src/app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");

const RegisterRouter = require("./routes/register");
const LoginRouter = require("./routes/login");

const registerRouter = new RegisterRouter();
const loginRouter = new LoginRouter();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(helmet());

console.log("express nya jalan nih");

app.use("/api" + "/test", (req, res) => {
	res.send({ success: true });
});
app.use("/api" + "/user-management", registerRouter.route());
app.use("/api" + "/user-management", loginRouter.route());

app.listen(3000, () => {
	console.log("Server listening on port " + 3000);
});

module.exports = app;
