const database = require("../db");

const Book = database.define("book", {
  id: {
    type: database.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: database.Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: database.Sequelize.STRING,
    allowNull: false
  },
  published_date: {
    type: database.Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Book