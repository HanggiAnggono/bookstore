const { Model } = require('sequelize');
const models = require('.');

class Book extends Model {}

Book.init(
  {
    id: {
      type: models.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: models.Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: models.Sequelize.STRING,
      allowNull: false,
    },
    published_date: {
      type: models.Sequelize.STRING,
      allowNull: true,
    },
    quantity_on_hand: {
      type: models.Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: models.sequelize,
    modelName: 'book',
  },
);

module.exports = Book;
