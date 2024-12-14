const Sequelize = require('sequelize');

const database = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(connectionString);

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
