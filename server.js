const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./DBConnection/DB')
require('dotenv').config();


connectDB(app)
app.use(cors());
app.use(express.json());
app.use('/', require('./Route/Route'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}


