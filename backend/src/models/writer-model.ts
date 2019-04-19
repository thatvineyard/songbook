import { Model } from './model';

// object file for songs
// metadata
//   metadata: title, artistRef, melodyRef
// lyrics
//   lyrics: list of stanzas
//     stansza: type, id, lines
//       lines: list of string

// stanza types: verse, chorus, reference

export class WriterModel implements Model {

  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
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
