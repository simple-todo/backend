"use strict";
module.exports = (sequelize, DataTypes) => {
	const todos = sequelize.define(
		"todos",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			task: DataTypes.STRING,
			is_completed: DataTypes.BOOLEAN,
			user_id: DataTypes.INTEGER,
			created_at: DataTypes.DATE,
			updated_at: DataTypes.DATE,
		},
		{
			tableName: "todos",
			timestamps: true,
			paranoid: false,
			underscored: true,
		},
	);
	todos.associate = function(models) {
		// associations can be defined here
	};
	return todos;
};
