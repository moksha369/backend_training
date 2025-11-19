const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usuariosRouter = require('./routes/usuarios');
require('dotenv').config();
const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

mongoose
  .connect(url)
  .then(() => console.log("Conectado no MongoDB"))
  .catch((err) => console.log("Erro ao conectar no MongoDB", err.message));


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/usuarios', usuariosRouter);


module.exports = app;
