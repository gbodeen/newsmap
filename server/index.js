const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const router = require('./router');

app.use(router);
app.use(express.static('public'));

app.listen(port);