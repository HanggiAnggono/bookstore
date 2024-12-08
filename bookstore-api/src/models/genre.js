const { sequelize, Sequelize } = require('.');

const Genre = sequelize.define('genre', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Genre;
