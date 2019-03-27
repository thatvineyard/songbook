import express from 'express';

import serverConstants from '../constants/serverConstants';
import router from './router';


// App
const app = express();

app.use(serverConstants.rootUrl, router);

app.listen(serverConstants.port);
console.log(`Running on http://${serverConstants.host}:${serverConstants.port}`);
