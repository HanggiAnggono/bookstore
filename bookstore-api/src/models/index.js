const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookstore-api', 'bookstore', 'bookstore', {
  dialect: 'sqlite',
  storage: 'bookstore-api.sqlite',
});

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
