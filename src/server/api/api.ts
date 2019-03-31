import express, { Router, Request, Response } from "express";
import { ApiBuilder, getApiInfo, getApiParams } from "./apiBuilder";
import serverConstants from "../../constants/serverConstants";
import { songsApiBuilder } from "./songsApi";
import { melodiesApiBuilder } from "./melodiesApi";
import { artistsApiBuilder } from "./artistsApi";
import { NextFunction } from "connect";

const songsUrl = "/songs";
const artistsUrl = "/artists";
const melodiesUrl = "/melodies";

export function createApi(): Router {
  const apiBuilder: ApiBuilder = new ApiBuilder(serverConstants.contextRoot);

  // Add subApis
  apiBuilder.subApi(songsUrl, songsApiBuilder);
  apiBuilder.subApi(melodiesUrl, melodiesApiBuilder);
  apiBuilder.subApi(artistsUrl, artistsApiBuilder);

  // Add api-info
  apiBuilder.addGet(
    serverConstants.apiInfoUrl,
    function getApiInfoWrapper(req: Request, res: Response) {
      getApiInfo(req, res, apiBuilder.methods);
    },
    "Get API info",
    getApiParams
  );

  let router: Router = express.Router();

  // Add method validator middleware
  router.use((req: Request, res: Response, next: NextFunction) => {
    res = apiBuilder.validate(req, res, apiBuilder.methods);
    if (res.statusCode / 100 === 2) {
      next();
    } else {
      res.send();
    }
  });

  apiBuilder.configureRouter(router);
  return router;
}
