const Sequelize = require('sequelize');

const dibi = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = 'postgres-0.postgres';
const port = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${dibi}`)

// const sequelize = new Sequelize(
//   process.env.POSTGRES_DB,
//   process.env.POSTGRES_USER,
//   process.env.POSTGRES_PASSWORD,
//   {
//     dialect: 'postgres',
//     host: host,
//     port: process.env.POSTGRES_PORT,
//     clientMinMessages: 'notice',
//   },
// );

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
