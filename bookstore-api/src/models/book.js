const db = require('../../models');

const sqlz = db.sequelize;

const Book = sqlz.define('book', {
  id: {
    type: sqlz.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: sqlz.Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: sqlz.Sequelize.STRING,
    allowNull: false,
  },
  published_date: {
    type: sqlz.Sequelize.STRING,
    allowNull: true,
  },
  quantity_on_hand: {
    type: sqlz.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Book;
