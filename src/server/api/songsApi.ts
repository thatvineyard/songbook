import express, { Request, Response } from "express";
import serverConstants from "../../constants/serverConstants";
import { databaseHandler } from "../../database/database";
import { ApiBuilder } from "./apiBuilder";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

/**
 * GET SONGS COLLECTION
 */

// Function
function getSongsCollection(req: Request, res: Response): void {
  let db = databaseHandler.Instance;
  res.send(db.getSongs());
}
songsApiBuilder.addGet(
  serverConstants.collectionUrl,
  getSongsCollection,
  "Get song collection"
);

/**
 * GET SONGS INDEX
 */

// Function
function getSongsIndex(req: Request, res: Response): void {
  res.send(["s001", "s002", "s003"]);
}
songsApiBuilder.addGet(
  serverConstants.indexUrl,
  getSongsIndex,
  "Get song index"
);

/**
 * GET SONGS ACTION
 */

// Function
function getSongsAction(req: Request, res: Response): void {
  res.send("Action performed");
}
songsApiBuilder.addGet(
  serverConstants.actionUrl,
  getSongsAction,
  "Temporary action"
);
