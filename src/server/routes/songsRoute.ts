import express, { Request, Response } from 'express';
import serverConstants from '../../constants/serverConstants';
import { database } from '../../database/database';

const songsRouter = express.Router();

function getSongCollection(req: Request, res: Response): void {
  let db = database.Instance;
  res.send(db.getEntries());
}

function getSongIndex(req: Request, res: Response): void {
  res.send(['s001', 's002', 's003']);
}

function getSongAction(req: Request, res: Response): void {
  res.send('Action performed');
}

function getApiInfo(req: Request, res: Response) {
  res.send([serverConstants.collectionUrl, serverConstants.indexUrl, serverConstants.actionUrl]);
}

function registerRoutes(): void {
  songsRouter.get(serverConstants.collectionUrl, getSongCollection);
  songsRouter.get(serverConstants.indexUrl, getSongIndex);
  songsRouter.get(serverConstants.actionUrl, getSongAction);
  songsRouter.get(serverConstants.apiInfoUrl, getApiInfo);
}

registerRoutes();



export default songsRouter;