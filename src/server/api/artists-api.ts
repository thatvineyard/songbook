import { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";

export let artistsApiBuilder: ApiBuilder = new ApiBuilder("");

/**
 * GET ARTISTS COLLECTION
 */

// Functions
function getArtistsCollection(req: Request, res: Response): void {
  res.send(["artist001, artist002, artist003"]);
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
 * GET ARTISTS INDEX
 */

// Function
function getArtistsIndex(req: Request, res: Response): void {
  res.send(["001", "002", "003"]);
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
