const models = require('.');

// sequelize model for inventory with book_id
const Inventory = models.sequelize.define('inventory', {
  book_id: {
    type: models.Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: models.Sequelize.INTEGER,
    allowNull: false,
  },
  action: {
    type: models.Sequelize.ENUM('add', 'remove'),
    allowNull: false,
  },
  notes: {
    type: models.Sequelize.TEXT('medium'),
    allowNull: true,
  },
  updated_by: {
    type: models.Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Inventory;
