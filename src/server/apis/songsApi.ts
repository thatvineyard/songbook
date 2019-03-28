import express, { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { databaseHandler } from "../../database/database";
import { ApiBuilder } from "./apiBuilder";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

songsApiBuilder.addGet(
  serverConstants.indexUrl,
  getSongIndex,
  "Get song index"
);
songsApiBuilder.addGet(
  serverConstants.collectionUrl,
  getSongCollection,
  "Get song collection"
);
songsApiBuilder.addGet(
  serverConstants.actionUrl,
  getSongAction,
  "Temporary action"
);

const songsRouter = express.Router();

function getSongCollection(req: Request, res: Response): void {
  let db = databaseHandler.Instance;
  res.send(db.getSongs());
}

function getSongIndex(req: Request, res: Response): void {
  res.send(["s001", "s002", "s003"]);
}

function getSongAction(req: Request, res: Response): void {
  res.send("Action performed");
}
