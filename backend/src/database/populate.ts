import { DatabaseHandler } from "./database-handler";
import { SongDatabaseHandler } from "./song-database-handler";
import { Database } from "./database";
import { SongModel, StanzaModel } from "../models/song-model";
import { join } from "path";

export function populateSongs(db: SongDatabaseHandler, numSongs: number, minHistory?: number, maxHistory?: numer): void {
  for (let i = 0; i < numSongs; i++) {
    maxHistory = maxHistory || 0;
    minHistory = minHistory || 0;
    let repetitions = Math.floor(Math.random() * (maxHistory - minHistory + 1) + minHistory);

    // create first song
    let song = generateRandomSong();
    let id = db.post(song).getId();

    // create revisions
    for (let j = 0; j < repetitions; j++) {
      let song = generateRandomSong();
      db.put(id, song);
    }
  }
}

export function generateRandomSong(): SongModel {
  var randomWords = require('random-words');
  return new SongModel(
    capitalizeEveyFirstLetter(randomWords({ min: 1, max: 7 })).join(' '),
    namify(randomWords({ min: 2, max: 3 })),
    capitalizeEveyFirstLetter(randomWords({ min: 2, max: 4 })).join(' '),
    [generateNewStanza()]
  );
}

function generateNewStanza(): StanzaModel {
  var randomWords = require('random-words');
  let numLines: number = (Math.ceil(Math.random() * 4) + 2) * 2;
  let lines: string[] = [];
  for (let i = 0; i < numLines; i++) {
    lines.push(randomWords({ min: 5, max: 10 }));
  }
  return new StanzaModel("verse", lines);
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