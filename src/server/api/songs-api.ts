import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

// common params
let paramTitle = new Parameter(ParameterType.BODY, "title", "string", true);
let paramIdRequired = new Parameter(ParameterType.QUERY, "id", "string", true);
let paramIdOptional = new Parameter(ParameterType.QUERY, "id", "string", false);

/**
 * PUT SONGS
 */

// Function
function putSong(req: Request, res: Response): void {
  if (req.query.id) {
    let id = req.query.id;

    let db = DatabaseHandler.Instance;
    res.send(db.getSongs());
  }
}

// Params
let putSongParams: Parameter[] = [paramIdRequired, paramTitle];

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
  if (!req.query.id) {
    res.status(Status.UNPROCESSABLE_ENTITY).send("Missing mandatory field: id");
  } else {
    let id = req.query.id;

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
let deleteSongParams: Parameter[] = [paramIdRequired];

// API
songsApiBuilder.addDelete("", deleteSong, "Delete song", deleteSongParams);

/**
 * GET SONGS
 */

// Function
function getSongs(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;

  if (req.query.id) {
    let id = req.query.id;
    let result = db.getSong(id);

    if (result !== null) {
      res.send(result);
    } else {
      res.status(Status.NOT_FOUND).send();
    }
  } else {
    res.send(db.getSongs());
  }
}

// PARAMS
let getSongsParams: Parameter[] = [paramIdOptional];

// API
songsApiBuilder.addGet("", getSongs, "Get songs", getSongsParams);

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
