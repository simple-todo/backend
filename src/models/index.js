require("dotenv").config();
const Sequelize = require("sequelize");
const pg = require("pg");

pg.defaults.ssl = true;

// Models
const users = require("./users");
const todos = require("./todos");

const {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST: host,
  DIALECT: dialect
} = process.env;
const sequelizeConnection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host,
  dialect
});

module.exports = {
  users: users(sequelizeConnection, Sequelize.DataTypes),
  todos: todos(sequelizeConnection, Sequelize.DataTypes)
};
