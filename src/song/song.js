"use strict";
// object file for songs
// metadata
//   metadata: title, artistRef, melodyRef
// lyrics
//   lyrics: list of stanzas
//     stansza: type, id, lines
//       lines: list of string  
// stanza types: verse, chorus, reference
var Song = /** @class */ (function () {
    function Song(title) {
        console.log(' --> Creating Song');
        this.title = title;
    }
    return Song;
}());
module.exports = Song;
