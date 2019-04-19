import { Router } from 'express';
import serverConstants from '../../constants/serverConstants';
import { ApiBuilder } from './api-framework/api-builder';
import { writersApiBuilder } from './writer-api';
import { melodiesApiBuilder } from './melodies-api';
import { collectionsApiBuilder } from './collection-api';
import { songsApiBuilder } from './songs-api';

const songsUrl = '/songs';
const writersUrl = '/writers';
const melodiesUrl = '/melodies';
const collectionUrl = '';
const apiInfoUrl = serverConstants.apiInfoUrl;

export function createApi(): Router {
  const apiBuilder: ApiBuilder = new ApiBuilder(serverConstants.contextRoot);

  // Add subApis
  apiBuilder.subApi(songsUrl, songsApiBuilder);
  apiBuilder.subApi(melodiesUrl, melodiesApiBuilder);
  apiBuilder.subApi(writersUrl, writersApiBuilder);
  apiBuilder.subApi(collectionUrl, collectionsApiBuilder);

  // Set settings
  apiBuilder.enableApiInfo(apiInfoUrl);
  apiBuilder.activateValidation();

  // Build and return router
  return apiBuilder.buildRouter(apiBuilder);
}
