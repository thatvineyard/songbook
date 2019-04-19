import { Entry } from '../database/entry';
import { Id } from 'database/id';
import { Model } from './model';

export class EntryModel<T extends object> implements Model {
  id: string;
  type: string;
  revision: number;
  created: Date;
  lastModified: Date;
  entryData: T | null;

  constructor(id: string,
              type: string,
              revision: number,
              created: Date,
              lastModified: Date,
              entryData: T | null) {
    this.id = id;
    this.type = type;
    this.revision = revision;
    this.created = created;
    this.lastModified = lastModified;
    this.entryData = entryData;
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
