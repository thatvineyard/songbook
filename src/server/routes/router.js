"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// var songsRoute = require('./songs-route');
var songs_route_1 = __importDefault(require("./songs-route"));
var serverConstants = require('../../constants/serverConstants');
var router = express_1.default.Router();
console.log('Registering routes.');
var songsUrl = '/songs';
songs_route_1.default.songsRoute.registerRoutes(router, songsUrl);
