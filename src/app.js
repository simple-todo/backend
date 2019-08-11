const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");

const RegisterRouter = require("./routes/Register");
const LoginRouter = require("./routes/Login");
const TodosRouter = require("./routes/Todos");

const registerRouter = new RegisterRouter();
const loginRouter = new LoginRouter();
const todosRouter = new TodosRouter();

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
app.use("/api" + "/todo-management", todosRouter.route());

module.exports = app;
