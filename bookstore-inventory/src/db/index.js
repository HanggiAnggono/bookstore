const Sequelize = require("sequelize");

const database = new Sequelize(
  "bookstore-inventory",
  "bookstore",
  "bookstore",
  {
    dialect: "sqlite",
    storage: "bookstore-inventory.sqlite",
  }
);

module.exports = database;
