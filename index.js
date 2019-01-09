const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
// app.get('/', (req, res) => res.send('Hello, welcome to dev'));

// serve static file
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 6003;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${port}`);
});
