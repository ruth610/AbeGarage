const express = require('express');
const cors = require('cors');
// in order to use the environment variables we need to load them
const dotenv = require('dotenv');
const sanitize = require('sanitize');
dotenv.config();
const routes = require('./routes/index');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize.middleware);
app.get('/home', (req, res) => {
  res.json({ message: 'Welcome to the Abe Garage API!' });
});
app.use(routes);
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});


module.exports = app;