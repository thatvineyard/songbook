import { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { ApiBuilder } from "./api-framework/api-builder";

export let melodiesApiBuilder: ApiBuilder = new ApiBuilder("");

/**
 * GET MELODIES COLLECTION
 */

// Function
function getMelodiesCollection(req: Request, res: Response): void {
  res.send(["melody001", "melody002", "melody003"]);
}

// API
melodiesApiBuilder.addGet(
  serverConstants.collectionUrl,
  getMelodiesCollection,
  "Get melody collection"
);

/**
 * GET MELODIES INDEX
 */

// Function
function getMelodiesIndex(req: Request, res: Response): void {
  res.send(['m001', 'm002', 'm003']);
}

// API
melodiesApiBuilder.addGet(
  serverConstants.indexUrl,
  getMelodiesIndex,
  'Get melody index'
);

/**
 * GET MELODIES ACTION
 */

// Function
function getMelodiesAction(req: Request, res: Response): void {
  res.send('Action performed');
}

// API
melodiesApiBuilder.addGet(
  serverConstants.actionUrl,
  getMelodiesAction,
  'Temporary action'
);
