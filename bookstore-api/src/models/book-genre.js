const { Model } = require('sequelize');
const { sequelize, Sequelize } = require('.');
const Book = require('./book');
const Genre = require('./genre');

class BookGenre extends Model {}

BookGenre.init(
  {
    bookId: {
      type: Sequelize.INTEGER,
      references: {
        model: Book,
        key: 'id',
      },
    },
    genreId: {
      type: Sequelize.INTEGER,
      references: {
        model: Genre,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'book_genre',
  },
);

Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

module.exports = BookGenre;
