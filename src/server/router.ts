import express, { Request, Response } from 'express';
import songsRouter from './routes/songsRoute';
import artistsRouter from './routes/artistsRoute';
import melodiesRouter from './routes/melodiesRoute';
import serverConstants from '../constants/serverConstants';

const router = express.Router();

const songsUrl = '/songs';
const artistsUrl = '/artists';
const melodiesUrl = '/melodies';

router.use(songsUrl, songsRouter);
router.use(artistsUrl, artistsRouter);
router.use(melodiesUrl, melodiesRouter);


function getApiInfo(req: Request, res: Response) {
  res.send([songsUrl, artistsUrl, melodiesUrl]);
}

router.get(serverConstants.apiInfoUrl, getApiInfo);

export default router;