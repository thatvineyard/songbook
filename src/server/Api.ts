import { Router } from "express";
import { ApiBuilder } from "./ApiBuilder";
import serverConstants from '../constants/serverConstants';
import { songsApiBuilder } from './routes/songsApi';


const songsUrl = '/songs';
const artistsUrl = '/artists';
const melodiesUrl = '/melodies';
// addRoute(songsUrl, songsRouter);
// addRoute(artistsUrl, artistsRouter);
// addRoute(melodiesUrl, melodiesRouter);
// addGet(serverConstants.apiInfoUrl, getApiInfo, "Returns api info");

// export default router;


export function createApi(): Router {

    let apiBuilder: ApiBuilder = new ApiBuilder(serverConstants.contextRoot);

    apiBuilder.subApi(songsUrl, songsApiBuilder);

    // apiBuilder.

    return apiBuilder.buildRouter();
}