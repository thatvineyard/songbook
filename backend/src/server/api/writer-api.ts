import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database-handler";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";
import { create404, create422, create500 } from "./error-handler/errorFactory";

export let writersApiBuilder: ApiBuilder = new ApiBuilder("");

let paramBodyFirstNameRequired = new Parameter(ParameterType.BODY, "firstName", "string", "", true);
let paramBodyFirstNameOptional = new Parameter(ParameterType.BODY, "firstName", "string", "", false);

let paramBodyLastNameRequired = new Parameter(ParameterType.BODY, "lastName", "string", "", true);
let paramBodyLastNameOptional = new Parameter(ParameterType.BODY, "lastName", "string", "", false);

let paramQueryIdRequired = new Parameter(ParameterType.QUERY, "id", "string", "", true);
let paramQueryIdOptional = new Parameter(ParameterType.QUERY, "id", "string", "", false);
let paramBodyIdRequired = new Parameter(ParameterType.BODY, "id", "string", "", true);
let paramBodyIdOptional = new Parameter(ParameterType.BODY, "id", "string", "", false);
let paramUrlIdRequired = new Parameter(ParameterType.URL, "id", "string", "", true);
let paramUrlIdOptional = new Parameter(ParameterType.URL, "id", "string", "", false);

let paramUrlRevisionRequired = new Parameter(ParameterType.QUERY, "revision", "integer", "", true);
let paramBodyRevisionOptional = new Parameter(ParameterType.QUERY, "revision", "integer", "", false);
let paramBodyRefsList = new Parameter(ParameterType.BODY, "refs", "list of strings", "", false);

//=========================================================================//
/**
 * GET WRITER
 */
//=========================================================================//

// Function
function getWriter(req: Request, res: Response): void {

  // Extract variables  
  let id = req.params.id;

  // Do
  let db = DatabaseHandler.Instance;
  let result = db.getWriter(id);

  // Validate result
  if (result == null) {
    create404("No writer found at id " + id).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// PARAMS
let getWriterParams: Parameter[] = [paramUrlIdRequired];

// API
writersApiBuilder.addGet(serverConstants.collectionUrl + "/:id", getWriter, "Get writer", getWriterParams);

//=========================================================================//
/**
 * GET SONGS
 */
//=========================================================================//

// Function
function getSongCollection(req: Request, res: Response): void {

  // Do
  let db = DatabaseHandler.Instance;
  let result = db.getWriters();

  // Validate result
  if (!result) {
    create500("Error when getting writers");
  }

  // Respond
  res.send(result);

}

// PARAMS
let getWriterCollectionParams: Parameter[] = [];

// API
writersApiBuilder.addGet(serverConstants.collectionUrl, getSongCollection, "Get writer collection", getWriterCollectionParams);

//=========================================================================//
/**
 * GET WRITERS INDEX
 */
//=========================================================================//

// Function
function getWritersIndex(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;
  res.send(db.getWritersIndex());
}
writersApiBuilder.addGet(
  serverConstants.indexUrl,
  getWritersIndex,
  "Get writers index"
);