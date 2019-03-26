"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var serverConstants = require('../constants/serverConstants');
var router = require('./routes/router');
// App
var app = express();
app.get('/', function (req, res) {
    res.send('Hello songbook\n');
});
app.use('/', router);
app.listen(serverConstants.port, serverConstants.host);
console.log("Running on http://" + serverConstants.host + ":" + serverConstants.port);
