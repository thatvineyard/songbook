import { Song, Stanza } from '../objects/song'

export class SongModel {

  title: string;
  artist: string;
  melody: string;
  stanzas: StanzaModel;

  constructor(title: string, artist: string, melody: string, stanzas: StanzaModel[]) {
    this.title = title;
    this.artist = artist;
    this.melody = melody;
    this.stanzas = stanzas;
  }

  public addStanza(type: string, lines: string[]) {

  }
}

export class StanzaModel {

  type: string;
  lines: string[];

  constructor(type: string, lines: string[]) {
    this.type = type;
    this.lines = lines;
  }
}