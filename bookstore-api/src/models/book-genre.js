const { sequelize, Sequelize } = require('.');
const Book = require('./book');
const Genre = require('./genre');

const BookGenre = sequelize.define('book_genre', {
  book_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
  genre_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Genre,
      key: 'id',
    },
  },
});

Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

module.exports = BookGenre;
