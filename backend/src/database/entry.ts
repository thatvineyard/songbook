import { randomBytes } from 'crypto';
import { Id, IdGenerator } from './id';

export class Entry<T extends object> {
  id: Id;
  type: string;
  revision: number;
  created: Date;
  lastModified: Date;
  entryData: T | null;

  constructor(entryData: T | null, idGenerator: IdGenerator) {
    this.entryData = entryData;
    if (entryData != null) {
      this.type = entryData.constructor.name;
    } else {
      this.type = 'null';
    }
    this.id = idGenerator.generate();
    this.revision = 1;
    this.created = new Date();
    this.lastModified = this.created;
  }

  public update(newEntryData: T | null) {
    this.entryData = newEntryData;
    if (newEntryData != null) {
      this.type = newEntryData.constructor.name;
    } else {
      this.type = 'null';
    }
    this.revision += 1;
    this.lastModified = new Date();
  }

  public getId(): string {
    return this.id.toString();
  }

  public idEquals(otherId: string): boolean {
    return this.id.toString() === otherId;
  }
}
