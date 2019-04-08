import { DatabaseHandler } from "./database-handler";
import { SongDatabaseHandler } from "./song-database-handler";
import { Database } from "./database";
import { SongModel, StanzaModel } from "../models/song-model";
import { join } from "path";
import { Entry } from "./entry";

export function populateSongs(db: SongDatabaseHandler, numSongs: number, minHistory?: number, maxHistory?: number): void {
  for (let i = 0; i < numSongs; i++) {
    maxHistory = maxHistory || 0;
    minHistory = minHistory || 0;
    let repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    // create first song
    let song = generateRandomSong();
    let result: Entry<SongModel> | null = db.post(song);

    if (result) {
      let id: string = result.getId();
      // create revisions
      for (let j = 0; j < repetitions; j++) {
        let song = generateRandomSong();
        db.put(id, song);
      }
    }
  }
}

export function generateRandomSong(): SongModel {
  var randomWords = require('random-words');
  return new SongModel(
    capitalizeEveyFirstLetter(randomWords({ min: 1, max: 7 })).join(' '),
    namify(randomWords({ min: 2, max: 3 })),
    capitalizeEveyFirstLetter(randomWords({ min: 2, max: 4 })).join(' '),
    generateStanzas()
  );
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

function capitalizeFirstLetter(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
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