const { sequelizeConnection } = require("../models/index");
const TodoRepo = require("../repositories/Todo");

class TodoServices {
	constructor() {
		this.todoRepo = new TodoRepo();
	}

	async addTodo(newTodo) {
		const transaction = await sequelizeConnection.transaction();
		try {
			const addTodo = await this.todoRepo.addTodo(newTodo, transaction);
			await transaction.commit();

			return addTodo;
		} catch (error) {
			console.log(error);
			await transaction.rollback();
			throw error;
		}
	}

	async getTodoByUserId(user_id) {
		try {
			return await this.todoRepo.getTodoByUserId(user_id);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async updateTodoById(todo_id) {
		const transaction = await sequelizeConnection.transaction();
		try {
			const todoDetails = await this.todoRepo.getTodoById(todo_id);
			const updateCompletedTask = await this.todoRepo.updateCompletedTodoById(todo_id, !todoDetails.is_completed, transaction);
			await transaction.commit();

			return updateCompletedTask;
		} catch (error) {
			console.log(error);
			await transaction.rollback();
			throw error;
		}
	}

	async deleteTodoById(todo_id) {
		const transaction = await sequelizeConnection.transaction();
		try {
			const deleteTodoById = await this.todoRepo.deleteTodoById(todo_id, transaction);
			await transaction.commit();

			return deleteTodoById;
		} catch (error) {
			console.log(error);
			await transaction.rollback();
			throw error;
		}
	}
}

module.exports = TodoServices;
