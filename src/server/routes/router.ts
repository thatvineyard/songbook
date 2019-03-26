import express from 'express';

// var songsRoute = require('./songs-route');
import songsRoute from './songs-route'

const serverConstants = require('../../constants/serverConstants');

const router = express.Router();

console.log('Registering routes.');

const songsUrl = '/songs';

song
songsRoute.registerRoutes(router, songsUrl);


