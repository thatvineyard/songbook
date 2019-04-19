import { Song, Stanza } from '../objects/song';
import { Model } from './model';
import { WriterModel } from './writer-model';

export class SongModel implements Model {

  title: string | undefined;
  writer: WriterModel | undefined;
  writerRef: string | undefined;
  melody: string | undefined;
  melodyRef: string | undefined;
  stanzas: StanzaModel[] | undefined;
  languageCode: string | undefined;

  constructor(title?: string,
              writerRef?: string,
              melodyRef?: string,
              stanzas?: StanzaModel[],
              languageCode?: string) {
    this.title = title;
    this.writerRef = writerRef;
    this.melodyRef = melodyRef;
    this.stanzas = stanzas;
    this.languageCode = languageCode || 'en';
  }

  public toDereference(): string[] {
    const variables: string[] = Object.keys(this);

    console.log(variables);
    return [];
  }

  public getReference(ley: string): string {
    return '';
  }

  public getDereferenceType(key: string): string {
    return '';
  }

  public dereference(key: string, data: object): void {
    //
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
