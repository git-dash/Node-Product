const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const config = require('./config')


app.use(morgan('dev'));

// import body-parser 
app.use(cors({
    origin: config.corsOrigins,
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(setSession);    //express-session disabled for now

// defining routes 
const productAPi = require('../rest-api/index')
app.use('', productAPi);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).send({ status: 500, message: error });
});
module.exports = app;