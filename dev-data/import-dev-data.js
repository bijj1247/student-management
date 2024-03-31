const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Result = require('../models/resultModel');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const db = String(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL');
  });
const results = JSON.parse(
  fs.readFileSync(`${__dirname}/results.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Result.create(results);
    console.log('Data Successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
