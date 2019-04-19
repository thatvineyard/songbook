import { Request, Response } from 'express';
import * as Status from 'http-status-codes';
import serverConstants from '../../constants/serverConstants';
import { DatabaseManager } from '../../database/database-manager';
import { ApiBuilder } from './api-framework/api-builder';
import { Parameter, ParameterType } from './api-framework/parameter';
import { create404, create422, create500 } from './error-handler/errorFactory';
import { ErrorResponse } from './error-handler/error-response';
import { SongModel } from '../../models/song-model';

export let songsApiBuilder: ApiBuilder = new ApiBuilder('');

// common params
const paramBodyTitleRequired = new Parameter(ParameterType.BODY, 'title', 'string', '', true);
const paramBodyTitleOptional = new Parameter(ParameterType.BODY, 'title', 'string', '', false);

const paramBodyWriterRefRequired = new Parameter(ParameterType.BODY, 'writerRef', 'string', '', true);
const paramBodyWriterRefOptional = new Parameter(ParameterType.BODY, 'writerRef', 'string', '', false);

const paramBodyMelodyRefRequired = new Parameter(ParameterType.BODY, 'melodyRef', 'string', '', true);
const paramBodyMelodyRefOptional = new Parameter(ParameterType.BODY, 'melodyRef', 'string', '', false);

const paramQueryIdRequired = new Parameter(ParameterType.QUERY, 'id', 'string', '', true);
const paramQueryIdOptional = new Parameter(ParameterType.QUERY, 'id', 'string', '', false);
const paramBodyIdRequired = new Parameter(ParameterType.BODY, 'id', 'string', '', true);
const paramBodyIdOptional = new Parameter(ParameterType.BODY, 'id', 'string', '', false);
const paramUrlIdRequired = new Parameter(ParameterType.URL, 'id', 'string', '', true);
const paramUrlIdOptional = new Parameter(ParameterType.URL, 'id', 'string', '', false);

const paramUrlRevisionRequired = new Parameter(ParameterType.QUERY, 'revision', 'integer', '', true);
const paramBodyRevisionOptional = new Parameter(ParameterType.QUERY, 'revision', 'integer', '', false);
const paramBodyRefsList = new Parameter(ParameterType.BODY, 'refs', 'list of strings', '', false);

// =========================================================================//
/**
 * GET SONG
 */
// =========================================================================//

// Function
function getSong(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;

  // Do
  const db = DatabaseManager.Instance;
  const result = db.getSong(id);

  // Validate result
  if (result == null) {
    create404('No song found at id ' + id).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// PARAMS
const getSongParams: Parameter[] = [paramUrlIdRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + '/:id', getSong, 'Get songs', getSongParams);

// =========================================================================//
/**
 * GET SONGS
 */
// =========================================================================//

// Function
function getSongCollection(req: Request, res: Response): void {

  // Do
  const db = DatabaseManager.Instance;
  const result = db.getSongs();

  // Validate result
  if (!result) {
    create500('Error when getting songs');
  }

  // Respond
  res.send(result);

}

// PARAMS
const getSongCollectionParams: Parameter[] = [];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl, getSongCollection, 'Get song collection', getSongCollectionParams);

// =========================================================================//
/**
 * POST SONGS
 */
// =========================================================================//

// Function
function postSong(req: Request, res: Response): void {

  // Extract variables
  const title = req.body.title;
  const artistRef = req.body.artistRef;
  const melodyRef = req.body.melodyRef;

  const song = new SongModel(title, artistRef, melodyRef);

  // Prepare database
  const db = DatabaseManager.Instance;

  // Do
  const id = db.postSong(song);

  if (!id) {
    create500('Posting returned no id, may not have been succesfull');
    return;
  }

  // Respond
  res.status(Status.CREATED).send(id);

}

// Params
const postSongParams: Parameter[] = [paramBodyTitleRequired, paramBodyWriterRefRequired, paramBodyMelodyRefRequired];

// API
songsApiBuilder.addPost(serverConstants.collectionUrl, postSong, 'Post song', postSongParams);

// =========================================================================//
/**
 * PUT SONGS
 */
// =========================================================================//

// Function
function putSong(req: Request, res: Response): void {

  // Extracting variables
  const id = req.params.id;
  const title = req.body.title;
  const writerRef = req.body.writerRef;
  const melodyRef = req.body.melodyRef;

  const song = new SongModel(title, writerRef, melodyRef);

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.putSong(id, song);

  // Validate result
  if (!result) {
    create404('No entry found, use post to create a new entry').sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// Params
const putSongParams: Parameter[] = [paramUrlIdRequired, paramBodyTitleRequired, paramBodyWriterRefRequired, paramBodyMelodyRefRequired];

// API
songsApiBuilder.addPut(serverConstants.collectionUrl + '/:id', putSong, 'Put song', putSongParams);

// =========================================================================//
/**
 * PATCH SONG
 */
// =========================================================================//

// Function
function patchSong(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;
  const title = req.body.title;
  const artist = req.body.artist;
  const melody = req.body.melody;

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.patchSong(id, title, artist, melody);

  // Validate result
  if (!result) {
    create404('No entry found, use post to create a new entry').sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// Params
const patchSongParams: Parameter[] = [paramUrlIdRequired, paramBodyTitleOptional, paramBodyWriterRefOptional, paramBodyMelodyRefOptional];

// API
songsApiBuilder.addPatch(serverConstants.collectionUrl + '/:id', patchSong, 'Patch song', patchSongParams);

// =========================================================================//
/**
 * DELETE SONG
 */
// =========================================================================//

// Function
function deleteSong(req: Request, res: Response): void {
  // Extract variables
  const id = req.params.id;

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.deleteSong(id);

  // Validate result
  if (!result) {
    create404('No song found at id ' + id).sendResponse(res);
    return;
  }

  res.send(result);
}

// Params
const deleteSongParams: Parameter[] = [paramUrlIdRequired];

// API
songsApiBuilder.addDelete(serverConstants.collectionUrl + '/:id', deleteSong, 'Delete song', deleteSongParams);

// =========================================================================//
/**
 * GET SONGS INDEX
 */
// =========================================================================//

// Function
function getSongsIndex(req: Request, res: Response): void {
  const db = DatabaseManager.Instance;
  res.send(db.getSongsIndex());
}
songsApiBuilder.addGet(
  serverConstants.indexUrl,
  getSongsIndex,
  'Get song index',
);

// =========================================================================//
/**
 * HISTORY: GET SONG REVISIONS
 */
// =========================================================================//

function recoverSongRevisions(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.recoverAllSongRevisions(id);

  // Validate result
  if (!result) {
    create404('Song not found');
  }

  // Respond
  res.send(result);

}

// Params
const recoverSongRevisionsParams: Parameter[] = [paramBodyIdRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + '/:id' + serverConstants.historyUrl, recoverSongRevisions, 'Recover song revision(s)', recoverSongRevisionsParams);

// =========================================================================//
/**
 * HISTORY: GET SONG REVISION
 */
// =========================================================================//

function recoverSongRevision(req: Request, res: Response): void {

  // Validate inputs
  if (!parseInt(req.params.revision)) {
    create422("Revision must be a number (was '" + req.params.revision + "')").sendResponse(res);
    return;
  }

  // Extract variables
  const id = req.params.id;
  const revision = parseInt(req.params.revision);

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.recoverSongRevision(id, revision);

  // Validate result
  if (result == null) {
    create404('No revision found at id: ' + id + ' rev: ' + revision).sendResponse(res);
    return;
  }

  // Respond
  res.send(result);

}

// Params
const recoverSongRevisionParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addGet(serverConstants.collectionUrl + '/:id' + serverConstants.historyUrl + '/:revision', recoverSongRevision, 'Recover song revision(s)', recoverSongRevisionParams);

// =========================================================================//
/**
 * HISTORY: DROP SONG REVISION
 */
// =========================================================================//

function dropSongRevision(req: Request, res: Response): void {

  // Validate params
  if (!(req.params.id && req.params.revision)) {
    create422('Invalid parameters');
    return;
  }

  // Validate types
  if (!parseInt(req.params.revision)) {
    create422("Revision must be a number (was '" + req.params.revision + "')").sendResponse(res);
    return;
  }

  // Get params
  const id = req.params.id;
  const revision = parseInt(req.params.revision);

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  const result = db.dropSongRevision(id, revision);

  // Validate answer
  if (result === null) {
    create404('No song found at id ' + id).sendResponse(res);
    return;
  }

  res.send(result);

}

// Params
const dropSongRevisionParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addDelete(serverConstants.collectionUrl + '/:id' + serverConstants.historyUrl + '/:revision', dropSongRevision, 'Drop song revision', dropSongRevisionParams);

// =========================================================================//
/**
 * ACTION: PURGE SONG
 */
// =========================================================================//

function purgeSong(req: Request, res: Response): void {

  // Extract variables
  const id = req.params.id;

  // Prepare database
  const db = DatabaseManager.Instance;

  // Validate database
  if (!db.hasSong(id)) {
    create404('Song with id ' + id + ' not found.').sendResponse(res);
    return;
  }

  // Do
  db.purgeSong(id);

  console.log(db.getSongs());

  // Respond
  res.status(Status.NO_CONTENT).send();
}

// Params
const purgeSongParams: Parameter[] = [paramBodyIdRequired];

// API
songsApiBuilder.addPost(serverConstants.collectionUrl + '/:id' + serverConstants.actionUrl + '/purge', purgeSong, 'Purge song', purgeSongParams);

// =========================================================================//
/**
 * ACTION: PURGE REVISION
 */
// =========================================================================//

function restoreSongRevision(req: Request, res: Response): void {
  const db = DatabaseManager.Instance;

  if (req.query.id) {
    const id = req.query.id;
    const result = db.getWriter(id);

    if (result !== null) {
      res.send(result);
    } else {
      create404('No song found at id ' + id).sendResponse(res);
    }
  } else {
    res.send(db.getSongs());
  }
}

// Params
const restoreSongParams: Parameter[] = [paramUrlIdRequired, paramUrlRevisionRequired];

// API
songsApiBuilder.addPost(serverConstants.actionUrl + '/restore', restoreSongRevision, 'Restore song revision', restoreSongParams);
