const { Sequelize } = require('sequelize');

const database = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

// Construct the connection string
const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

console.log('connectionString', connectionString);

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

module.exports = {
  sequelize,
  syncDatabase
}; 