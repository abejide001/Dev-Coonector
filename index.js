const express = require('express');
require('./db_config/database');

const app = express();

app.get('/', (req, res) => res.send('Hello, welcome to dev'));
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
