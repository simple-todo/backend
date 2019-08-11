const TodoServices = require("../services/Todo");
const ResponseTemplate = require("../helpers/ResponseTemplate");
const Token = require("../helpers/Token");

class TodoController {
	constructor() {
		this.responseTemplate = new ResponseTemplate();
		this.todoServices = new TodoServices();
		this.token = new Token();
	}

	decodeToken(token) {
		return this.token.decode(token);
	}

	successTodo(res, type, task) {
		let message = "";
		switch (type) {
			case "GET":
				message = "Success get Task";
				break;
			case "POST":
				message = "Success add new Task";
				break;
			case "PUT":
				message = "Success change Task complete";
				break;
			case "DELETE":
				message = "Success delete Task";
				break;

			default:
				break;
		}
		this.responseTemplate.responseSuccess(res, { success: true, message, data: task });
	}

	async addTodo(req, res) {
		try {
			const { task } = req.body;
			const userProfile = this.decodeToken(req.headers.authorization);

			const newTodo = {
				task,
				user_id: userProfile.id,
				is_completed: false,
			};

			const insertNewTodo = await this.todoServices.addTodo(newTodo);
			this.successTodo(res, "POST", insertNewTodo.dataValues);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}

	async getTodoByUserId(req, res) {
		try {
			const userProfile = this.decodeToken(req.headers.authorization);
			const user_id = String(userProfile.id);

			const getTodoByUserId = await this.todoServices.getTodoByUserId(user_id);
			this.successTodo(res, "GET", getTodoByUserId);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}

	async updateTodoById(req, res) {
		try {
			const { todo_id } = req.body;
			const updatetodoById = await this.todoServices.updateTodoById(todo_id);
			this.successTodo(res, "PUT", updatetodoById[1]);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}

	async deleteTodoById(req, res) {
		try {
			const { todo_id } = req.body;
			const deleteTodoById = await this.todoServices.deleteTodoById(todo_id);
			this.successTodo(res, "DELETE", deleteTodoById);
		} catch (error) {
			this.responseTemplate.responseError(res, error);
		}
	}
}

module.exports = TodoController;
