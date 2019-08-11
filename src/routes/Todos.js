const express = require("express");

const TodoValidationMiddleware = require("../middleware/todo");
const TodoController = require("../controllers/Todo");

class TodosRouter {
	constructor() {
		this.todoValidationMiddleware = new TodoValidationMiddleware();
		this.todoController = new TodoController();
		this.todosRoute = express.Router();
	}

	route() {
		this.todosRoute.post(
			"/todos",
			(req, res, next) => this.todoValidationMiddleware.checkTodoPostInput(req, res, next),
			(req, res) => this.todoController.addTodo(req, res),
		);

		this.todosRoute.get(
			"/todos",
			(req, res, next) => this.todoValidationMiddleware.checkTodoGetInput(req, res, next),
			(req, res) => this.todoController.getTodoByUserId(req, res),
		);

		this.todosRoute.put(
			"/todos",
			(req, res, next) => this.todoValidationMiddleware.checkTodoId(req, res, next),
			(req, res) => this.todoController.updateTodoById(req, res),
		);

		this.todosRoute.delete(
			"/todos",
			(req, res, next) => this.todoValidationMiddleware.checkTodoId(req, res, next),
			(req, res) => this.todoController.deleteTodoById(req, res),
		);

		return this.todosRoute;
	}
}

module.exports = TodosRouter;
