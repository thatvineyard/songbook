import { Router, Request, Response } from 'express';

const express = require('express');
const serverConstants = require('../constants/serverConstants');
const router = require('./routes/router');


// App
const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello songbook\n');
});

app.use('/', router);

app.listen(serverConstants.port, serverConstants.host);
console.log(`Running on http://${serverConstants.host}:${serverConstants.port}`);
