const app = require('./app');
const express = require('express');
// const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;



app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
