"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    },
    {
      tableName: "users",
      freezeTableName: true,
      timestamps: false,
      paranoid: false,
      underscored: true
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
