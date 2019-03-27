import express, { Request, Response } from 'express';
import serverConstants from '../../constants/serverConstants';

const artistsRouter = express.Router();

function getCollection(req: Request, res: Response): void {
  res.send(['artist001, artist002, artist003']);
}

function getIndex(req: Request, res: Response): void {
  res.send(['001', '002', '003']);
}

function getAction(req: Request, res: Response): void {
  res.send('Action performed');
}

function getApiInfo(req: Request, res: Response) {
  res.send([serverConstants.collectionUrl, serverConstants.indexUrl, serverConstants.actionUrl]);
}

function registerRoutes(): void {
  artistsRouter.get(serverConstants.collectionUrl, getCollection);
  artistsRouter.get(serverConstants.indexUrl, getIndex);
  artistsRouter.get(serverConstants.actionUrl, getAction);
  artistsRouter.get(serverConstants.apiInfoUrl, getApiInfo);
}

registerRoutes();

export default artistsRouter;