import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";
import { create404, create422 } from "./error-handler/errorFactory";
import { ErrorResponse } from "./error-handler/error-response";
import { Song } from "models/song";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

// common params
let paramTitleRequired = new Parameter(ParameterType.BODY, "title", "string", true);
let paramTitleOptional = new Parameter(ParameterType.BODY, "title", "string", false);
let paramArtistRequired = new Parameter(ParameterType.BODY, "artist", "string", true);
let paramArtistOptional = new Parameter(ParameterType.BODY, "artist", "string", false);
let paramMelodyRequired = new Parameter(ParameterType.BODY, "melody", "string", true);
let parammelodyOptional = new Parameter(ParameterType.BODY, "melody", "string", false);
let paramIdRequired = new Parameter(ParameterType.QUERY, "id", "string", true);
let paramIdOptional = new Parameter(ParameterType.QUERY, "id", "string", false);
let paramRefsList = new Parameter(ParameterType.BODY, "refs", "list of strings", false);

/**
 * PUT SONGS
 */

// Function
function putSong(req: Request, res: Response): void {
  if (req.query.id && req.body.title && req.body.artist && req.body.melody) {
    let id = req.query.id;
    let title = req.body.title;
    let artist = req.body.artist;
    let melody = req.body.melody;

    let db = DatabaseHandler.Instance;

    let result = db.putSong(id, title, artist, melody);
    if (result) {
      res.send(result);
    } else {
      create404("No entry found, use post to create a new entry").sendResponse(res);
    }
  }
}

// Params
let putSongParams: Parameter[] = [paramIdRequired, paramTitleRequired, paramArtistRequired, paramMelodyRequired];

// API
songsApiBuilder.addPut("", putSong, "Put song", putSongParams);

/**
 * POST SONGS
 */

// Function
function postSong(req: Request, res: Response): void {
  if (req.body.title && req.body.artist && req.body.melody) {
    let title = req.body.title;
    let artist = req.body.artist;
    let melody = req.body.melody;

    let db = DatabaseHandler.Instance;
    let id = db.postSong(title, artist, melody);

    res.status(Status.CREATED).send(id);
  } else {
    create422(
      "The body parameter title was " + typeof req.body.title
    ).sendResponse(res);
  }
}

// Params
let postSongParams: Parameter[] = [paramTitleRequired, paramArtistRequired, paramMelodyRequired];

// API
songsApiBuilder.addPost("", postSong, "Post song", postSongParams);

/**
 * PATCH SONG
 */

// Function
function patchSong(req: Request, res: Response): void {
  if (req.query.id && (req.body.title || req.body.artist || req.body.melody || true)) {
    let id = req.query.id;
    let title = req.body.title;
    let artist = req.body.artist;
    let melody = req.body.melody;

    let db = DatabaseHandler.Instance;

    let result = db.patchSong(id, title, artist, melody);
    if (result) {
      res.send(result);
    } else {
      create404("No entry found, use post to create a new entry").sendResponse(res);
    }
  }
}

// Params
let patchSongParams: Parameter[] = [paramIdRequired, paramTitleOptional, paramArtistOptional, parammelodyOptional];

// API
songsApiBuilder.addPatch("", patchSong, "Patch song", patchSongParams);


/**
 * DELETE SONG
 */

// Function
function deleteSong(req: Request, res: Response): void {
  if (req.query.id) {
    let id = req.query.id;

    let db = DatabaseHandler.Instance;
    let success = db.deleteSong(id);

    if (success) {
      res.status(Status.NO_CONTENT).send();
    } else {
      create404("No song found at id " + id).sendResponse(res);
    }
  } else {
    create422("The query parameter Id was " + typeof req.query.id).sendResponse(
      res
    );
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
      create404("No song found at id " + id).sendResponse(res);
    }
  } else {
    res.send(db.getSongs());
  }
}

// PARAMS
let getSongsParams: Parameter[] = [paramIdOptional, paramRefsList];

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
