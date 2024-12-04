const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { sequelize } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'bookstore inventory',
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const startApp = async () => {
  await sequelize.sync({ alter: true });
  console.log('database synced');

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
};

module.exports = startApp;
