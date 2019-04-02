import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database-handler";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";
import { create404, create422 } from "./error-handler/errorFactory";
import { ErrorResponse } from "./error-handler/error-response";
import { Song } from "models/song";

export let songsApiBuilder: ApiBuilder = new ApiBuilder("");

// common params
let paramBodyTitleRequired = new Parameter(ParameterType.BODY, "title", "string", true);
let paramBodyTitleOptional = new Parameter(ParameterType.BODY, "title", "string", false);

let paramBodyArtistRequired = new Parameter(ParameterType.BODY, "artist", "string", true);
let paramBodyArtistOptional = new Parameter(ParameterType.BODY, "artist", "string", false);

let paramBodyMelodyRequired = new Parameter(ParameterType.BODY, "melody", "string", true);
let paramBodyMelodyOptional = new Parameter(ParameterType.BODY, "melody", "string", false);

let paramQueryIdRequired = new Parameter(ParameterType.QUERY, "id", "string", true);
let paramQueryIdOptional = new Parameter(ParameterType.QUERY, "id", "string", false);
let paramBodyIdRequired = new Parameter(ParameterType.BODY, "id", "string", true);
let paramBodyIdOptional = new Parameter(ParameterType.BODY, "id", "string", false);

let paramQueryRevisionRequired = new Parameter(ParameterType.QUERY, "revision", "integer", true);
let paramBodyRefsList = new Parameter(ParameterType.BODY, "refs", "list of strings", false);

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
let putSongParams: Parameter[] = [paramQueryIdRequired, paramBodyTitleRequired, paramBodyArtistRequired, paramBodyMelodyRequired];

// API
songsApiBuilder.addPut(serverConstants.collectionUrl, putSong, "Put song", putSongParams);

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
let postSongParams: Parameter[] = [paramBodyTitleRequired, paramBodyArtistRequired, paramBodyMelodyRequired];

// API
songsApiBuilder.addPost(serverConstants.collectionUrl, postSong, "Post song", postSongParams);

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
let patchSongParams: Parameter[] = [paramQueryIdRequired, paramBodyTitleOptional, paramBodyArtistOptional, paramBodyMelodyOptional];

// API
songsApiBuilder.addPatch(serverConstants.collectionUrl, patchSong, "Patch song", patchSongParams);


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
let deleteSongParams: Parameter[] = [paramQueryIdRequired];

// API
songsApiBuilder.addDelete(serverConstants.collectionUrl, deleteSong, "Delete song", deleteSongParams);

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
let getSongsParams: Parameter[] = [paramQueryIdOptional, paramBodyRefsList];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl, getSongs, "Get songs", getSongsParams);

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

/**
 * HISTORY: GET SONG REVISIONS
 */
function getSongRevision(req: Request, res: Response): void {
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
    res.send(db.get());
  }
}

// Params
let getSongRevisionParams: Parameter[] = [paramQueryIdRequired, paramQueryRevisionRequired];

// API
songsApiBuilder.addGet(serverConstants.historyUrl, getSongRevision, "Get song revision", getSongRevisionParams);

/**
 * HISTORY: DROP SONG REVISION
 */
function dropSongRevision(req: Request, res: Response): void {
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

// Params
let dropSongRevisionParams: Parameter[] = [paramQueryIdRequired, paramQueryRevisionRequired];

// API
songsApiBuilder.addDelete(serverConstants.historyUrl, dropSongRevision, "Drop song revision", dropSongRevisionParams);

/**
 * ACTION: PURGE SONG
 */
function purgeSong(req: Request, res: Response): void {
  let db = DatabaseHandler.Instance;

}

// Params
let purgeSongParams: Parameter[] = [paramBodyIdRequired];

// API
songsApiBuilder.addPost(serverConstants.actionUrl + "/purge", dropSongRevision, "Purge song revision", dropSongRevisionParams);

/**
 * ACTION: PURGE REVISION 
 */
function restoreSongRevision(req: Request, res: Response): void {
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

// Params
let restoreSongParams: Parameter[] = [paramQueryIdRequired, paramQueryRevisionRequired];

// API
songsApiBuilder.addPost(serverConstants.actionUrl + "/restore", restoreSongRevision, "Restore song revision", restoreSongParams);
