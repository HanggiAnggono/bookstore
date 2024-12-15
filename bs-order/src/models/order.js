const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'customer_name'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'book_id'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  underscored: true
});

module.exports = Order; 