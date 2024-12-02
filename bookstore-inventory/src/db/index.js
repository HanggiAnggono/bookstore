const Sequelize = require('sequelize')
const database = new Sequelize('bookstore-api', 'bookstore', 'bookstore', {
  dialect: 'sqlite',
  storage: 'bookstore-api.sqlite',
})

module.exports = database