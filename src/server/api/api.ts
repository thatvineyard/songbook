import { Router, Request, Response } from "express";
import { ApiBuilder } from "./apiBuilder";
import serverConstants from "../../constants/serverConstants";
import { songsApiBuilder } from "./songsApi";
import { melodiesApiBuilder } from "./melodiesApi";
import { artistsApiBuilder } from "./artistsApi";

const songsUrl = "/songs";
const artistsUrl = "/artists";
const melodiesUrl = "/melodies";

export function createApi(): Router {
  const apiBuilder: ApiBuilder = new ApiBuilder(serverConstants.contextRoot);

  apiBuilder.subApi(songsUrl, songsApiBuilder);
  apiBuilder.subApi(melodiesUrl, melodiesApiBuilder);
  apiBuilder.subApi(artistsUrl, artistsApiBuilder);

  apiBuilder.addGet(serverConstants.apiInfoUrl, function A(
    req: Request,
    res: Response
  ) {
    res.send(apiBuilder.methods);
  });

  return apiBuilder.buildRouter();
}
