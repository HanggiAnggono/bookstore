const database = require('../db');

// sequelize model for inventory with book_id
const Inventory = database.define('inventory', {
  book_id: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
  },
  quantity_on_hand: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
  },
  action: {
    type: database.Sequelize.ENUM('add', 'remove'),
    allowNull: false,
  },
});

module.exports = Inventory;
