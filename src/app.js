/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { encryptCookieNodeMiddleware } = require('encrypt-cookie');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const connectToMongo = require('./db/connection');
const { authenticationMiddleware } = require('./middleware/guard');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const constants = require('./lib/constants');
const { errorHandler, corsOptions } = require('./services/utils');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
const SECRET_KEY="DENEME"

app.use(cookieParser(SECRET_KEY));
app.use(encryptCookieNodeMiddleware(SECRET_KEY));

app.use('/api', authenticationMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const swaggerSpec = swaggerJsdoc(constants.SWAGGER_OPTIONS);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectToMongo();
  });
}

module.exports = app;
