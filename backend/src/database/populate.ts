import { DatabaseManager } from './database-manager';
import { Database } from './database';
import { SongModel, StanzaModel } from '../models/song-model';
import { join } from 'path';
import { Entry } from './entry';
import { WriterModel } from '../models/writer-model';
import { write } from 'fs';
import { Melody } from 'objects/melody';
import { EntryModel } from 'models/entry-model';

export function populate(db: DatabaseManager, numEntries: number, minHistory: number = 0, maxHistory: number = 0): void {
  populateWriters(db, numEntries / 2, minHistory, maxHistory);
  populateSongs(db, numEntries, minHistory, maxHistory);
}

// WRITERS
function populateWriters(db: DatabaseManager, numWriters: number, minHistory: number = 0, maxHistory: number = 0): void {
  for (let i = 0; i < numWriters; i += 1) {
    const repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    const writer = generateWriter();

    const result: EntryModel<WriterModel> | null = db.postWriter(writer);

    if (result) {
      const id: string = result.id;
      // create revisions
      for (let j = 0; j < repetitions; j += 1) {
        const writer = generateWriter();
        db.putWriter(id, writer);
      }
    }
  }
}

function generateWriter(): WriterModel {
  return new WriterModel(generateName(), generateName());
}

function generateName(): string {
  const randomWords = require('random-words');
  return capitalizeFirstLetter(randomWords(1)[0]);
}

function getRandomWriterId(db: DatabaseManager): string {
  const writerIndex = db.getWritersIndex();

  const index = Math.floor(Math.random() * writerIndex.length);

  return writerIndex[index];
}

// SONGS

function populateSongs(db: DatabaseManager, numSongs: number, minHistory: number = 0, maxHistory: number = 0): void {
  for (let i = 0; i < numSongs; i += 1) {
    const repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    // create first song
    const songModel = generateSong(getRandomWriterId(db));
    const result: EntryModel<SongModel> | null = db.postSong(songModel);

    if (result) {
      const id: string = result.id;
      // create revisions
      for (let j = 0; j < repetitions; j += 1) {
        const song = generateSong(getRandomWriterId(db));
        db.putSong(id, song);
      }
    }
  }
}

export function generateSong(writerRef: string, melodyRef: string = 'melody-0'): SongModel {
  const song = new SongModel(
    generateSongTitle(),
  );
  song.writerRef = writerRef;
  song.melodyRef = melodyRef;
  song.stanzas = generateStanzas();
  return song;
}

function generateSongTitle(): string {
  const randomWords = require('random-words');
  return capitalizeEveyFirstLetter(randomWords({ min: 1, max: 7 })).join(' ');
}

function generateStanzas(): StanzaModel[] {
  const result: StanzaModel[] = [];

  const repetitions = Math.floor(Math.random() * (10 - 2 + 1) + 2);
  for (let i = 0; i < repetitions; i += 1) {
    result.push(generateNewStanza());
  }
  return result;
}

function generateNewStanza(): StanzaModel {

  const stanzaTypeSelector: number = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  let stanzaType: string;
  switch (stanzaTypeSelector) {
    case 0:
    default:
      stanzaType = 'verse';
      break;
    case 1:
      stanzaType = 'chorus';
      break;
  }

  const randomWords = require('random-words');
  const numLines: number = (Math.ceil(Math.random() * 2) + 2) * 2;
  const lines: string[] = [];
  for (let i = 0; i < numLines; i += 1) {
    lines.push(randomWords({ min: 4, max: 7, join: ' ' }));
  }
  return new StanzaModel(stanzaType, lines);
}

// UTILS
function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function capitalizeEveyFirstLetter(stringArray: string[]): string[] {
  return stringArray.map((string: string) => {
    return capitalizeFirstLetter(string);
  });
}

function namify(stringArray: string[]): string {
  if (stringArray.length < 3) {
    const result = capitalizeEveyFirstLetter(stringArray);
    return result.join(' ');
  }
  return `${capitalizeFirstLetter(stringArray[0])} ${stringArray[1][0].toUpperCase()}. ${capitalizeFirstLetter(stringArray[2])}`;

}
