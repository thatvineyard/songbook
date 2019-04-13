import { DatabaseHandler } from "./database-handler";
import { SongDatabaseHandler } from "./song-database-handler";
import { Database } from "./database";
import { SongModel, StanzaModel } from "../models/song-model";
import { join } from "path";
import { Entry } from "./entry";
import { WriterDatabaseHandler } from "./writer-database-handler";
import { WriterModel } from "../models/writer-model";
import { write } from "fs";
import { Melody } from "objects/melody";


export function populate(songDb: SongDatabaseHandler, writerDb: WriterDatabaseHandler, numEntries: number, minHistory?: number, maxHistory?: number): void {
  populateWriters(writerDb, numEntries / 2, minHistory, maxHistory);
  populateSongs(songDb, writerDb, numEntries, minHistory, maxHistory);
}

// WRITERS
function populateWriters(db: WriterDatabaseHandler, numWriters: number, minHistory?: number, maxHistory?: number): void {
  for (let i = 0; i < numWriters; i++) {
    maxHistory = maxHistory || 0;
    minHistory = minHistory || 0;
    let repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    let writer = generateWriter();


    let result: Entry<WriterModel> | null = db.post(writer);

    if (result) {
      let id: string = result.getId();
      // create revisions
      for (let j = 0; j < repetitions; j++) {
        let writer = generateWriter();
        db.put(id, writer);
      }
    }
  }
}

function generateWriter(): WriterModel {
  return new WriterModel(generateName(), generateName());
}

function generateName(): string {
  var randomWords = require('random-words');
  return capitalizeFirstLetter(randomWords(1)[0]);
}

function getRandomWriter(writerDb: WriterDatabaseHandler): string {
  let writerIndex = writerDb.getIndex();

  let index = Math.floor(Math.random() * writerIndex.length);

  return writerIndex[index];
}

// SONGS

function populateSongs(songDb: SongDatabaseHandler, writerDb: WriterDatabaseHandler, numSongs: number, minHistory?: number, maxHistory?: number): void {
  for (let i = 0; i < numSongs; i++) {
    maxHistory = maxHistory || 0;
    minHistory = minHistory || 0;
    let repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    // create first song
    let songModel = generateSong(getRandomWriter(writerDb));
    let result: Entry<SongModel> | null = songDb.post(songModel);

    if (result) {
      let id: string = result.getId();
      // create revisions
      for (let j = 0; j < repetitions; j++) {
        let song = generateSong(getRandomWriter(writerDb));
        songDb.put(id, song);
      }
    }
  }
}


export function generateSong(writerRef: string, melodyRef: string = "melody-0"): SongModel {
  let song = new SongModel(
    generateSongTitle()
  );
  song.writerRef = writerRef;
  song.melodyRef = melodyRef;
  song.stanzas = generateStanzas();
  return song;
}

function generateSongTitle(): string {
  var randomWords = require('random-words');
  return capitalizeEveyFirstLetter(randomWords({ min: 1, max: 7 })).join(' ');
}

function generateStanzas(): StanzaModel[] {
  let result: StanzaModel[] = [];

  let repetitions = Math.floor(Math.random() * (10 - 2 + 1) + 2);
  for (let i = 0; i < repetitions; i++) {
    result.push(generateNewStanza());
  }
  return result;
}

function generateNewStanza(): StanzaModel {

  let stanzaTypeSelector: number = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  let stanzaType: string;
  switch (stanzaTypeSelector) {
    case 0:
    default:
      stanzaType = "verse";
      break;
    case 1:
      stanzaType = "chorus";
      break;
  }

  var randomWords = require('random-words');
  let numLines: number = (Math.ceil(Math.random() * 2) + 2) * 2;
  let lines: string[] = [];
  for (let i = 0; i < numLines; i++) {
    lines.push(randomWords({ min: 4, max: 7, join: ' ' }));
  }
  return new StanzaModel(stanzaType, lines);
}

// UTILS
function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function capitalizeEveyFirstLetter(stringArray: string[]): string[] {
  return stringArray.map(string => {
    return capitalizeFirstLetter(string);
  });
}

function namify(stringArray: string[]): string {
  if (stringArray.length < 3) {
    stringArray = capitalizeEveyFirstLetter(stringArray);
    return stringArray.join(' ');
  } else {
    return capitalizeFirstLetter(stringArray[0]) + ' ' + stringArray[1][0].toUpperCase() + '. ' + capitalizeFirstLetter(stringArray[2]);
  }

}