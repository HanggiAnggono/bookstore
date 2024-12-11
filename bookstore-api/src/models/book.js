const { Model } = require('sequelize');
const models = require('.');
const Author = require('./author');

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
    published_date: {
      type: models.Sequelize.STRING,
      allowNull: true,
    },
    isbn: {
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

Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = Book;
