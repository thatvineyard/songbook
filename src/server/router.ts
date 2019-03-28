import express, { Request, Response, Router } from 'express';
import songsRouter from './routes/songsRouter';
import artistsRouter from './routes/artistsRouter';
import melodiesRouter from './routes/melodiesRouter';
import serverConstants from '../constants/serverConstants';

const router = express.Router();

const songsUrl = '/songs';
const artistsUrl = '/artists';
const melodiesUrl = '/melodies';


class Method {
  method: string;
  url: string;
  description: string;
  parameters: string[];

  constructor(method: string, url: string, description: string, parameters: string[]) {
    this.method = method;
    this.url = url;
    this.description = description;
    this.parameters = parameters;
  }
}

let subpaths: string[] = [];
let methods: Method[] = [];

addRoute(songsUrl, songsRouter);
addRoute(artistsUrl, artistsRouter);
addRoute(melodiesUrl, melodiesRouter);
addGet(serverConstants.apiInfoUrl, getApiInfo, "Returns api info");

function addRoute(url: string, handlers: RequestHandler[]) {
  router.use(url, handlers);
  router.
  subpaths.push(url);
}

function addGet(url: string, handlers: RequestHandler[], description?: string, parameters?: string[]) {
  router.get(url, handlers);
  methods.push(new Method("GET", url, description, parameters));
}

function getApiInfo(req: Request, res: Response) {
  res.send({subpaths, methods});
}




export default router;