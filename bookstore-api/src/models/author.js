const { Model } = require('sequelize');
const { sequelize, Sequelize } = require('.');

class Author extends Model {}

Author.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'author',
  },
);

module.exports = Author;
