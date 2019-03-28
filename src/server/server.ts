import express from 'express';
import { createApi } from './Api';

import serverConstants from '../constants/serverConstants';

// App
const app = express();

app.use('/', createApi());

app.listen(serverConstants.port);
console.log(`Running on http://${serverConstants.host}:${serverConstants.port}`);
