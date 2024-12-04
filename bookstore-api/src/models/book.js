const models = require('.');

const Book = models.sequelize.define('book', {
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
});

module.exports = Book;
