const { Model } = require('sequelize');
const models = require('.');

// sequelize model for inventory with book_id
class Inventory extends Model {}

Inventory.init(
  {
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
  },
  {
    sequelize: models.sequelize,
    modelName: 'inventory',
  },
);

module.exports = Inventory;
