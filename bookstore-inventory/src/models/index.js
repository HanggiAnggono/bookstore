const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'bookstore-inventory',
  'bookstore',
  'bookstore',
  {
    dialect: 'sqlite',
    storage: 'bookstore-inventory.sqlite',
  },
);

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
