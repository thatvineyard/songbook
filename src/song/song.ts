// object file for songs
// metadata
//   metadata: title, artistRef, melodyRef
// lyrics
//   lyrics: list of stanzas
//     stansza: type, id, lines
//       lines: list of string  


// stanza types: verse, chorus, reference

class Song {

    title: String;

    constructor (title: String) {
        console.log(' --> Creating Song');
        this.title = title;
    }

    // function addStanza (type: String, arrayOfLines) {
    //     this.type = type;
    //     this.arrayOfLines = arrayOfLines;
    // }

    // function getLyrics () {
    //     return arrayOfLines.
    // }
}

module.exports = Song;