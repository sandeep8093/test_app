require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 2022;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected !!!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/auth', require('./src/router/auth'));
app.use('/user', require('./src/router/profile'));


app.listen(PORT, () => console.log('your port has been started on ' + PORT));