const { todos } = require("../models/index");

class TodoRepo {
	async addTodo(newTodo, transaction) {
		return todos.create(newTodo, {
			raw: true,
			logging: false,
			transaction,
		});
	}

	async getTodoByUserId(user_id) {
		return todos.findAll({ where: { user_id }, order: [["id", "ASC"]], raw: true, logging: false });
	}

	async getTodoById(todo_id) {
		return todos.findOne({ where: { id: todo_id }, raw: true, logging: false });
	}

	async updateCompletedTodoById(todo_id, is_completed, transaction) {
		return todos.update({ is_completed }, { returning: true, where: { id: todo_id }, transaction });
	}

	async deleteTodoById(todo_id, transaction) {
		return todos.destroy({
			where: {
				id: todo_id,
			},
			raw: true,
			logging: false,
			transaction,
		});
	}
}

module.exports = TodoRepo;
