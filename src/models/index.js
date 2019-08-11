require("dotenv").config();
const Sequelize = require("sequelize");
const pg = require("pg");

pg.defaults.ssl = true;

// Models
const users = require("./users");
const todos = require("./todos");

const { DATABASE, USERNAME, PASSWORD, HOST: host, DIALECT: dialect } = process.env;
// const sequelizeConnection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
// 	logging: process.env.NODE_ENV === "dev" ? console.log : null,
// 	isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE || "SERIALIZABLE",
// 	host,
// 	dialect,
// });

const sequelizeConnection = new Sequelize("d3viiqp1ocoohg", "cjxjnpgwzpouvj", "5799c1e80df5a50bfe539cd0417617ec1b8e3c0555282d46f7df1a9e74522d08", {
	// logging: process.env.NODE_ENV === "dev" ? console.log : null,
	isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE || "SERIALIZABLE",
	host: "ec2-54-163-236-33.compute-1.amazonaws.com",
	dialect: "postgres",
});

module.exports = {
	sequelizeConnection,
	users: users(sequelizeConnection, Sequelize.DataTypes),
	todos: todos(sequelizeConnection, Sequelize.DataTypes),
};
