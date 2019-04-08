// object file for songs
// metadata
//   metadata: title, artistRef, melodyRef
// lyrics
//   lyrics: list of stanzas
//     stansza: type, id, lines
//       lines: list of string

// stanza types: verse, chorus, reference

export class Artist {

  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // function addStanza (type: String, arrayOfLines) {
  //     this.type = type;
  //     this.arrayOfLines = arrayOfLines;
  // }

  // function getLyrics () {
  //     return arrayOfLines.
  // }
}
