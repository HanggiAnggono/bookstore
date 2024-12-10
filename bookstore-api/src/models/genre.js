const { sequelize, Sequelize } = require('.');

class Genre extends Sequelize.Model {}

Genre.init(
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
    sequelize,
    modelName: 'genre',
  },
);

module.exports = Genre;
