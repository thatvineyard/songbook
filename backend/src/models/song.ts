import { Stanza } from './stanza';

// object file for songs
// metadata
//   metadata: title, artistRef, melodyRef
// lyrics
//   lyrics: list of stanzas
//     stansza: type, id, lines
//       lines: list of string

// stanza types: verse, chorus, reference

export class Song {
  title: string;
  artist: string;
  melody: string;
  stanzas: Stanza[];

  constructor(title: string, artist: string, melody: string, stanzas: Stanza[]) {
    console.log(" --> Creating Song");
    this.title = title;
    this.artist = artist;
    this.melody = melody;
    this.stanzas = stanzas || [];
    console.log(stanzas);
    console.log(this.stanzas);
    console.log(this);
  }

  // function addStanza (type: String, arrayOfLines) {
  //     this.type = type;
  //     this.arrayOfLines = arrayOfLines;
  // }

  // function getLyrics () {
  //     return arrayOfLines.
  // }
}
