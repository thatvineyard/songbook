

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
  languageCode: string;
  original: boolean;

  constructor(title: string, artist: string, melody: string, stanzas?: Stanza[], languageCode?: string, original: boolean = false) {
    this.title = title;
    this.artist = artist;
    this.melody = melody;
    this.stanzas = stanzas || [];
    this.languageCode = languageCode || 'en';
    this.original = original;
  }

  // function addStanza (type: String, arrayOfLines) {
  //     this.type = type;
  //     this.arrayOfLines = arrayOfLines;
  // }

  // function getLyrics () {
  //     return arrayOfLines.
  // }
}

export class Stanza {
  type: string;
  lines: string[];

  constructor(type: string, lines: string[]) {
    this.type = type;
    this.lines = lines;
  }
}
