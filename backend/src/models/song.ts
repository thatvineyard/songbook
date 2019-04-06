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
  melody: string

  constructor(title: string, artist: string, melody: string) {
    console.log(" --> Creating Song");
    this.title = title;
    this.artist = artist;
    this.melody = melody;
  }

  // function addStanza (type: String, arrayOfLines) {
  //     this.type = type;
  //     this.arrayOfLines = arrayOfLines;
  // }

  // function getLyrics () {
  //     return arrayOfLines.
  // }
}
