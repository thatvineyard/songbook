import { Router } from "express";
import serverConstants from "../../constants/serverConstants";
import { ApiBuilder } from "./api-framework/api-builder";
import { artistsApiBuilder } from "./artists-api";
import { melodiesApiBuilder } from "./melodies-api";
import { songsApiBuilder } from "./songs-api";

const songsUrl = "/songs";
const artistsUrl = "/artists";
const melodiesUrl = "/melodies";
const apiInfoUrl = serverConstants.apiInfoUrl;

export function createApi(): Router {
  const apiBuilder: ApiBuilder = new ApiBuilder(serverConstants.contextRoot);

  // Add subApis
  apiBuilder.subApi(songsUrl, songsApiBuilder);
  apiBuilder.subApi(melodiesUrl, melodiesApiBuilder);
  apiBuilder.subApi(artistsUrl, artistsApiBuilder);

  // Set settings
  apiBuilder.enableApiInfo(apiInfoUrl);
  apiBuilder.activateValidation();

  // Build and return router
  return apiBuilder.buildRouter(apiBuilder);
}
