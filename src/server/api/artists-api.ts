import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";

export let artistsApiBuilder: ApiBuilder = new ApiBuilder("");

/**
 * GET ARTISTS COLLECTION
 */

// Functions
function getArtistsCollection(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;

  res.send(db.getArtists());
}

// Parameters
let paramHello: Parameter = new Parameter(
  ParameterType.BODY,
  "hello",
  "string"
);
let paramGoodbye: Parameter = new Parameter(
  ParameterType.BODY,
  "goodbye",
  "boolean"
);
paramHello.addDependency(paramGoodbye, "true");
let getArtistsCollectionParameters: Parameter[] = [paramHello, paramGoodbye];

// API
artistsApiBuilder.addGet(
  serverConstants.collectionUrl,
  getArtistsCollection,
  "Get artists collection",
  getArtistsCollectionParameters
);

/**
 * POST ARTIST
 */
// Function
function postArtist(req: Request, res: Response): void {
  if (req.body.firstName && req.body.lastName) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let db = DatabaseHandler.Instance;
    let id = db.postArtist(firstName, lastName);

    res.status(Status.CREATED).send(id);
  }
}

// Params
let postArtistParams: Parameter[] = [
  new Parameter(ParameterType.BODY, "firstName", "string", true),
  new Parameter(ParameterType.BODY, "lastName", "string", true)
];

// API
artistsApiBuilder.addPost("", postArtist, "Post artist", postArtistParams);

/**
 * PUT ARTIST
 */
// Function
function putArtist(req: Request, res: Response): void {
  if (req.body.firstName && req.body.lastName) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let db = DatabaseHandler.Instance;
    let id = db.postArtist(firstName, lastName);

    res.status(Status.CREATED).send(id);
  }
}

// Params
let putArtistParams: Parameter[] = [
  new Parameter(ParameterType.BODY, "firstName", "string", true),
  new Parameter(ParameterType.BODY, "lastName", "string", true)
];

// API
artistsApiBuilder.addPut("", putArtist, "Post artist", putArtistParams);

/**
 * GET ARTISTS INDEX
 */

// Function
function getArtistsIndex(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;

  res.send(db.getArtistsIndex);
}

// API
artistsApiBuilder.addGet(
  serverConstants.indexUrl,
  getArtistsIndex,
  "Get artists index"
);

/**
 * GET ARTISTS ACTION
 */

// Function
function getArtistsAction(req: Request, res: Response): void {
  res.send("Action performed");
}

// API
artistsApiBuilder.addGet(
  serverConstants.actionUrl,
  getArtistsAction,
  "Temporary action"
);
