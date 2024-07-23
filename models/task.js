"use strict";
const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "tasks",
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      taskDescription: {
        type: Sequelize.STRING,
      },
      dueDate: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    },
    { underscored: false }
  );
};
