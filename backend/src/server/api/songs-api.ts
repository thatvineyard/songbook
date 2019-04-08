import { Request, Response } from "express";
import * as Status from "http-status-codes";
import serverConstants from "../../constants/serverConstants";
import { DatabaseHandler } from "../../database/database-handler";
import { ApiBuilder } from "./api-framework/api-builder";
import { Parameter, ParameterType } from "./api-framework/parameter";
import { create404, create422, create500 } from "./error-handler/errorFactory";
import { ErrorResponse } from "./error-handler/error-response";
import { SongModel } from "../../models/song-model";

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
let paramUrlIdRequired = new Parameter(ParameterType.URL, "id", "string", true);
let paramUrlIdOptional = new Parameter(ParameterType.URL, "id", "string", false);

let paramUrlRevisionRequired = new Parameter(ParameterType.QUERY, "revision", "integer", true);
let paramBodyRevisionOptional = new Parameter(ParameterType.QUERY, "revision", "integer", false);
let paramBodyRefsList = new Parameter(ParameterType.BODY, "refs", "list of strings", false);


//=========================================================================//
/**
 * GET SONGS
 */
//=========================================================================//

// Function
function getSong(req: Request, res: Response): void {

  // Extract variables  
  let id = req.params.id;

  // Do
  let db = DatabaseHandler.Instance;
  let result = db.getSong(id);

  // Validate result
  if (result == null) {
    create404("No song found at id " + id).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// PARAMS
let getSongParams: Parameter[] = [paramUrlIdRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + "/:id", getSong, "Get songs", getSongParams);

//=========================================================================//
/**
 * GET SONGS
 */
//=========================================================================//

// Function
function getSongs(req: Request, res: Response): void {

  // Do
  let db = DatabaseHandler.Instance;
  let result = db.getSongs();

  // Validate result
  if (!result) {
    create500("Error when getting songs");
  }

  // Respond
  res.send(db.getSongs());

}

// PARAMS
let getSongsParams: Parameter[] = [];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl, getSongs, "Get songs", getSongsParams);

//=========================================================================//
/**
 * POST SONGS
 */
//=========================================================================//

// Function
function postSong(req: Request, res: Response): void {

  // Extract variables
  let title = req.body.title;
  let artist = req.body.artist;
  let melody = req.body.melody;

  let song = new SongModel(title, artist, melody);

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Do
  let id = db.postSong(song);

  if (!id) {
    create500("Posting returned no id, may not have been succesfull");
    return;
  }

  // Respond
  res.status(Status.CREATED).send(id);

}

// Params
let postSongParams: Parameter[] = [paramBodyTitleRequired, paramBodyArtistRequired, paramBodyMelodyRequired];

// API
songsApiBuilder.addPost(serverConstants.collectionUrl, postSong, "Post song", postSongParams);

//=========================================================================//
/**
 * PUT SONGS
 */
//=========================================================================//

// Function
function putSong(req: Request, res: Response): void {

  // Extracting variables
  let id = req.params.id;
  let title = req.body.title;
  let artist = req.body.artist;
  let melody = req.body.melody;

  let song = new SongModel(title, artist, melody);

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.putSong(id, song);

  // Validate result
  if (!result) {
    create404("No entry found, use post to create a new entry").sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// Params
let putSongParams: Parameter[] = [paramUrlIdRequired, paramBodyTitleRequired, paramBodyArtistRequired, paramBodyMelodyRequired];

// API
songsApiBuilder.addPut(serverConstants.collectionUrl + "/:id", putSong, "Put song", putSongParams);


//=========================================================================//
/**
 * PATCH SONG
 */
//=========================================================================//

// Function
function patchSong(req: Request, res: Response): void {

  // Extract variables
  let id = req.params.id;
  let title = req.body.title;
  let artist = req.body.artist;
  let melody = req.body.melody;

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.patchSong(id, title, artist, melody);

  // Validate result
  if (!result) {
    create404("No entry found, use post to create a new entry").sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// Params
let patchSongParams: Parameter[] = [paramUrlIdRequired, paramBodyTitleOptional, paramBodyArtistOptional, paramBodyMelodyOptional];

// API
songsApiBuilder.addPatch(serverConstants.collectionUrl + "/:id", patchSong, "Patch song", patchSongParams);

//=========================================================================//
/**
 * DELETE SONG
 */
//=========================================================================//

// Function
function deleteSong(req: Request, res: Response): void {
  // Extract variables
  let id = req.params.id;

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.deleteSong(id);

  // Validate result
  if (!result) {
    create404("No song found at id " + id).sendResponse(res);
    return;
  }

  res.send(result);
}

// Params
let deleteSongParams: Parameter[] = [paramUrlIdRequired];

// API
songsApiBuilder.addDelete(serverConstants.collectionUrl + "/:id", deleteSong, "Delete song", deleteSongParams);

//=========================================================================//
/**
 * GET SONGS INDEX
 */
//=========================================================================//

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

//=========================================================================//
/**
 * HISTORY: GET SONG REVISIONS
 */
//=========================================================================//

function recoverSongRevisions(req: Request, res: Response): void {

  // Extract variables
  let id = req.params.id;

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.recoverAllSongRevisions(id);

  // Validate result
  if (!result) {
    create404("Song not found");
  }

  // Respond
  res.send(result);

}

// Params
let recoverSongRevisionsParams: Parameter[] = [paramBodyIdRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + "/:id" + serverConstants.historyUrl, recoverSongRevisions, "Recover song revision(s)", recoverSongRevisionsParams);

//=========================================================================//
/**
 * HISTORY: GET SONG REVISION
 */
//=========================================================================//

function recoverSongRevision(req: Request, res: Response): void {

  // Validate inputs
  if (!parseInt(req.params.revision)) {
    create422("Revision must be a number (was '" + req.params.revision + "')").sendResponse(res);
    return;
  }

  // Extract variables
  let id = req.params.id;
  let revision = parseInt(req.params.revision);

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.recoverSongRevision(id, revision);

  // Validate result
  if (result == null) {
    create404("No revision found at id: " + id + " rev: " + revision).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}


// Params
let recoverSongRevisionParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + "/:id" + serverConstants.historyUrl + "/:revision", recoverSongRevision, "Recover song revision(s)", recoverSongRevisionParams);

//=========================================================================//
/**
 * HISTORY: DROP SONG REVISION
 */
//=========================================================================//

function dropSongRevision(req: Request, res: Response): void {

  // Validate params
  if (!(req.params.id && req.params.revision)) {
    create422("Invalid parameters");
    return;
  }

  // Validate types
  if (!parseInt(req.params.revision)) {
    create422("Revision must be a number (was '" + req.params.revision + "')").sendResponse(res);
    return;
  }

  // Get params
  let id = req.params.id;
  let revision = parseInt(req.params.revision);

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  let result = db.dropSongRevision(id, revision);

  // Validate answer
  if (result === null) {
    create404("No song found at id " + id).sendResponse(res);
    return;
  }

  res.send(result);

}

// Params
let dropSongRevisionParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addDelete(serverConstants.collectionUrl + "/:id" + serverConstants.historyUrl + "/:revision", dropSongRevision, "Drop song revision", dropSongRevisionParams);

//=========================================================================//
/**
 * ACTION: PURGE SONG
 */
//=========================================================================//

function purgeSong(req: Request, res: Response): void {

  // Extract variables
  let id = req.params.id;

  // Prepare database
  let db = DatabaseHandler.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404("Song with id " + id + " not found.").sendResponse(res);
    return;
  }

  // Do
  db.purgeSong(id);

  console.log(db.getSongs());

  // Respond
  res.status(Status.NO_CONTENT).send();
}

// Params
let purgeSongParams: Parameter[] = [paramBodyIdRequired];

// API
songsApiBuilder.addPost(serverConstants.collectionUrl + "/:id" + serverConstants.actionUrl + "/purge", purgeSong, "Purge song", purgeSongParams);

//=========================================================================//
/**
 * ACTION: PURGE REVISION 
 */
//=========================================================================//

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
let restoreSongParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addPost(serverConstants.actionUrl + "/restore", restoreSongRevision, "Restore song revision", restoreSongParams);
