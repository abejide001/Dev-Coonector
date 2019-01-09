const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('./db_config/database');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');
const user = require('./routes/api/user');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/post', post);
app.use('/api/profile', profile);
app.use('/api/user', user);
app.get('/', (req, res) => res.send('Hello, welcome to dev'));
const port = process.env.PORT || 6003;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${port}`);
});
