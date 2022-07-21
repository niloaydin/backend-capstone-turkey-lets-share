const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const connectToMongo = require('./db/connection');

const app = express();
const port = process.env.NODE_LOCAL_PORT;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    connectToMongo();
  });
}

module.exports = app;
