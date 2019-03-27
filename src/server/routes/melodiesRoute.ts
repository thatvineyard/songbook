import express, { Request, Response } from 'express';
import serverConstants from '../../constants/serverConstants';

const melodiesRouter = express.Router();

function getCollection(req: Request, res: Response): void {
  res.send(['melody001', 'melody002', 'melody003']);
}

function getIndex(req: Request, res: Response): void {
  res.send(['m001', 'm002', 'm003']);
}

function getAction(req: Request, res: Response): void {
  res.send('Action performed');
}

function getApiInfo(req: Request, res: Response) {
  res.send([serverConstants.collectionUrl, serverConstants.indexUrl, serverConstants.actionUrl]);
}

function registerRoutes(): void {
  melodiesRouter.get(serverConstants.collectionUrl, getCollection);
  melodiesRouter.get(serverConstants.indexUrl, getIndex);
  melodiesRouter.get(serverConstants.actionUrl, getAction);
  melodiesRouter.get(serverConstants.apiInfoUrl, getApiInfo);
}

registerRoutes();

export default melodiesRouter;