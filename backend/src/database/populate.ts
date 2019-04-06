import { DatabaseHandler } from "./database-handler";
import { Database } from "./database";
import { Song } from "../models/song";
import { join } from "path";

export function populateSongs(db: DatabaseHandler, numSongs: number): void {
  for (let i = 0; i < numSongs; i++) {
    let song = generateRandomSong();
    db.postSong(song.title, song.artist, song.melody);
  }
}

export function generateRandomSong(): Song {
  var randomWords = require('random-words');
  return new Song(
    capitalizeEveyFirstLetter(randomWords({ min: 1, max: 7 })).join(' '),
    namify(randomWords({ min: 2, max: 3 })),
    capitalizeEveyFirstLetter(randomWords({ min: 2, max: 4 })).join(' ')
  );
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