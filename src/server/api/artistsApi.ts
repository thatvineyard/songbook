import express, { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { ApiBuilder } from "./apiBuilder";

export let artistsApiBuilder: ApiBuilder = new ApiBuilder("");

artistsApiBuilder.addGet(
  serverConstants.indexUrl,
  getArtistsIndex,
  "Get melody index"
);
artistsApiBuilder.addGet(
  serverConstants.collectionUrl,
  getArtistsCollection,
  "Get melody collection"
);
artistsApiBuilder.addGet(
  serverConstants.actionUrl,
  getArtistsAction,
  "Temporary action"
);

function getArtistsCollection(req: Request, res: Response): void {
  res.send(["artist001, artist002, artist003"]);
}

function getArtistsIndex(req: Request, res: Response): void {
  res.send(["001", "002", "003"]);
}

function getArtistsAction(req: Request, res: Response): void {
  res.send("Action performed");
}
