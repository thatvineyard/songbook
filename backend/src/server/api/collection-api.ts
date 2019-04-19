import { Request, Response } from 'express';
import * as Status from 'http-status-codes';
import serverConstants from '../../constants/serverConstants';
import { DatabaseManager } from '../../database/database-manager';
import { ApiBuilder } from './api-framework/api-builder';
import { Parameter, ParameterType } from './api-framework/parameter';
import { create404, create422, create500 } from './error-handler/errorFactory';
import { ErrorResponse } from './error-handler/error-response';
import { SongModel } from '../../models/song-model';
import { WriterModel } from '../../models/writer-model';

export let collectionsApiBuilder: ApiBuilder = new ApiBuilder('');

// params
const paramQueryIdRequired = new Parameter(ParameterType.QUERY, 'id', 'string', '', true);
const paramQueryIdOptional = new Parameter(ParameterType.QUERY, 'id', 'string', '', false);
const paramBodyIdRequired = new Parameter(ParameterType.BODY, 'id', 'string', '', true);
const paramBodyIdOptional = new Parameter(ParameterType.BODY, 'id', 'string', '', false);
const paramUrlIdRequired = new Parameter(ParameterType.URL, 'id', 'string', '', true);
const paramUrlIdOptional = new Parameter(ParameterType.URL, 'id', 'string', '', false);

// =========================================================================//
/**
 * GET ENTRY
 */
// =========================================================================//

// Function
function getEntry(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;

  // Do
  const db = DatabaseManager.Instance;
  const result = db.get(id);

  // Validate result
  if (result == null) {
    create404('No entry found at id ${id}').sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// PARAMS
const getEntryParams: Parameter[] = [paramUrlIdRequired];

// API
collectionsApiBuilder.addGet(`${serverConstants.collectionUrl}/:id`, getEntry, 'Get entry', getEntryParams);
