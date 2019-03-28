import express, { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { ApiBuilder } from "./apiBuilder";

export let melodiesApiBuilder: ApiBuilder = new ApiBuilder("");

melodiesApiBuilder.addGet(
  serverConstants.indexUrl,
  getMelodiesIndex,
  "Get melody index"
);
melodiesApiBuilder.addGet(
  serverConstants.collectionUrl,
  getMelodiesCollection,
  "Get melody collection"
);
melodiesApiBuilder.addGet(
  serverConstants.actionUrl,
  getMelodiesAction,
  "Temporary action"
);

function getMelodiesCollection(req: Request, res: Response): void {
  res.send(["melody001", "melody002", "melody003"]);
}

function getMelodiesIndex(req: Request, res: Response): void {
  res.send(["m001", "m002", "m003"]);
}

function getMelodiesAction(req: Request, res: Response): void {
  res.send("Action performed");
}
