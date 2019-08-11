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
app.use("/api" + "/test", (req, res) => {
	res.send({ success: true });
});

// Routes
app.use("/api" + "/user-management", registerRouter.route());
app.use("/api" + "/user-management", loginRouter.route());

module.exports = app;
