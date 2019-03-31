import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

// common params
let paramTitle = new Parameter(ParameterType.BODY, "title", "string", true);
let paramId = new Parameter(ParameterType.BODY, "id", "string", true);

/**
 * PUT SONGS
 */

// Function
function putSong(req: Request, res: Response): void {
  if (!req.body.id) {
    res.status(Status.UNPROCESSABLE_ENTITY).send("Missing mandatory field: id");
  } else {
    let id = req.body.id;

    let db = DatabaseHandler.Instance;
    res.send(db.getSongs());
  }
}

// Params
let putSongParams: Parameter[] = [paramId, paramTitle];

// API
songsApiBuilder.addPut("", putSong, "Put song", putSongParams);

/**
 * POST SONGS
 */

// Function
function postSong(req: Request, res: Response): void {
  if (!req.body.title) {
    res
      .status(Status.UNPROCESSABLE_ENTITY)
      .send("Missing mandatory field: title");
  } else {
    let title = req.body.title;

    let db = DatabaseHandler.Instance;
    let id = db.postSong(title);

    res.status(Status.CREATED).send(id);
  }
}

// Params
let postSongParams: Parameter[] = [paramTitle];

// API
songsApiBuilder.addPost("", postSong, "Post song", postSongParams);

/**
 * DELETE SONG
 */

// Function
function deleteSong(req: Request, res: Response): void {
  if (!req.body.id) {
    res.status(Status.UNPROCESSABLE_ENTITY).send("Missing mandatory field: id");
  } else {
    let id = req.body.id;

    let db = DatabaseHandler.Instance;
    let success = db.deleteSong(id);

    if (success) {
      res.status(Status.NO_CONTENT).send();
    } else {
      res.status(Status.NOT_FOUND).send();
    }
  }
}

// Params
let deleteSongParams: Parameter[] = [paramId];

// API
songsApiBuilder.addDelete("", deleteSong, "Delete song", deleteSongParams);

/**
 * GET SONGS COLLECTION
 */

// Function
function getSongsCollection(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;
  res.send(db.getSongs());
}

// API
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
  let db = DatabaseHandler.Instance;
  res.send(db.getSongsIndex());
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
