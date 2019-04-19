import { Request, Response } from 'express';
import * as Status from 'http-status-codes';
import serverConstants from '../../constants/serverConstants';
import { DatabaseManager } from '../../database/database-manager';
import { ApiBuilder } from './api-framework/api-builder';
import { Parameter, ParameterType } from './api-framework/parameter';
import { create404, create422, create500 } from './error-handler/errorFactory';

export let writersApiBuilder: ApiBuilder = new ApiBuilder('');

const paramBodyFirstNameRequired = new Parameter(ParameterType.BODY, 'firstName', 'string', '', true);
const paramBodyFirstNameOptional = new Parameter(ParameterType.BODY, 'firstName', 'string', '', false);

const paramBodyLastNameRequired = new Parameter(ParameterType.BODY, 'lastName', 'string', '', true);
const paramBodyLastNameOptional = new Parameter(ParameterType.BODY, 'lastName', 'string', '', false);

const paramQueryIdRequired = new Parameter(ParameterType.QUERY, 'id', 'string', '', true);
const paramQueryIdOptional = new Parameter(ParameterType.QUERY, 'id', 'string', '', false);
const paramBodyIdRequired = new Parameter(ParameterType.BODY, 'id', 'string', '', true);
const paramBodyIdOptional = new Parameter(ParameterType.BODY, 'id', 'string', '', false);
const paramUrlIdRequired = new Parameter(ParameterType.URL, 'id', 'string', '', true);
const paramUrlIdOptional = new Parameter(ParameterType.URL, 'id', 'string', '', false);

const paramUrlRevisionRequired = new Parameter(ParameterType.QUERY, 'revision', 'integer', '', true);
const paramBodyRevisionOptional = new Parameter(ParameterType.QUERY, 'revision', 'integer', '', false);
const paramBodyRefsList = new Parameter(ParameterType.BODY, 'refs', 'list of strings', '', false);

// =========================================================================//
/**
 * GET WRITER
 */
// =========================================================================//

// Function
function getWriter(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;

  // Do
  const db = DatabaseManager.Instance;
  const result = db.getWriter(id);

  // Validate result
  if (result == null) {
    create404('No writer found at id ' + id).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// PARAMS
const getWriterParams: Parameter[] = [paramUrlIdRequired];

// API
writersApiBuilder.addGet(serverConstants.collectionUrl + '/:id', getWriter, 'Get writer', getWriterParams);

// =========================================================================//
/**
 * GET SONGS
 */
// =========================================================================//

// Function
function getSongCollection(req: Request, res: Response): void {

  // Do
  const db = DatabaseManager.Instance;
  const result = db.getWriters();

  // Validate result
  if (!result) {
    create500('Error when getting writers');
  }

  // Respond
  res.send(result);

}

// PARAMS
const getWriterCollectionParams: Parameter[] = [];

// API
writersApiBuilder.addGet(serverConstants.collectionUrl, getSongCollection, 'Get writer collection', getWriterCollectionParams);

// =========================================================================//
/**
 * GET WRITERS INDEX
 */
// =========================================================================//

// Function
function getWritersIndex(req: Request, res: Response): void {
  const db = DatabaseManager.Instance;
  res.send(db.getWritersIndex());
}
writersApiBuilder.addGet(
  serverConstants.indexUrl,
  getWritersIndex,
  'Get writers index',
);
