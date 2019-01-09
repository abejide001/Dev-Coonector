/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const { DB_USER, DB_PASSWORD } = process.env;

const connect = mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds145434.mlab.com:45434/dev-connector`)
  .then(() => console.log('databse connected'))
  .catch(err => console.log(err.message));

module.exports = connect;
