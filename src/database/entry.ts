import { randomBytes } from "crypto";
import { Id, IdGenerator } from "./id";

export class Entry {
  id: Id;
  type: string;
  revision: number;
  created: Date;
  lastModified: Date;
  entryData: object;

  constructor(entryData: object, idGenerator: IdGenerator) {
    this.entryData = entryData;
    this.type = entryData.constructor.name;
    this.id = idGenerator.generate();
    this.revision = 1;
    this.created = new Date();
    this.lastModified = this.created;
  }

  public update(newEntryData: object) {
    this.entryData = newEntryData;
    this.revision++;
    this.lastModified = new Date();
  }

  public getId(): string {
    return this.id.toString();
  }

  public idEquals(otherId: string): boolean {
    return this.id.toString() === otherId;
  }
}
