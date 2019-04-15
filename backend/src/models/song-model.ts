import { Song, Stanza } from '../objects/song';
import { Model } from './model';

export class SongModel implements Model {

  title: string | undefined;
  writer: Writer | undefined;
  writerRef: string | undefined;
  melody: string | undefined;
  melodyRef: string | undefined;
  stanzas: StanzaModel[] | undefined;
  languageCode: string | undefined;

  constructor(title?: string,
    writerRef?: string,
    melodyRef?: string,
    writerDisplayName?: string,
    melody?: string,
    stanzas?: StanzaModel[],
    languageCode?: string) {
    this.title = title;
    this.writerDisplayName = writerDisplayName;
    this.writerRef = writerRef;
    this.melody = melody;
    this.melodyRef = melodyRef;
    this.stanzas = stanzas;
    this.languageCode = languageCode || 'en';
  }

  public toDereference(): string[] {
    const variables: string[] = Object.keys(this);

    console.log(variables);
  }
}

export class StanzaModel {

  type: string | undefined;
  lines: string[] | undefined;

  constructor(type?: string, lines?: string[]) {
    this.type = type;
    this.lines = lines;
  }
}
