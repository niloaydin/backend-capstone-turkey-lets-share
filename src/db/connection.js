/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongo_db_password = process.env.MONGO_DB_PASSWORD


let url = `mongodb://niloaydin:nilayaydin@cloud-project.cluster-ciswf9m25zdg.eu-west-3.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

console.log('Connection URL:', url);
console.log("AAA")

const connectToMongo = () => {
  mongoose.connect(url);

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Database connected to AWS Document DB');
  });

  db.on('error', (err) => {
    console.error('Database connection error: ', err);
  });
};

module.exports = connectToMongo;
