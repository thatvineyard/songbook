import { entryData } from "./entryData";
import { randomBytes } from "crypto";
import { id } from "./id";

export class Entry {
  id: string;
  type: string;
  revision: number;
  created: Date;
  lastModified: Date;
  entryData: object;

  constructor(entryData: object) {
    this.entryData = entryData;
    this.type = entryData.constructor.name;
    this.id = new id(this.type).toString();
    this.revision = 1;
    this.created = new Date();
    this.lastModified = this.created;
  }

  public update(newEntryData: entryData) {
    this.entryData = newEntryData;
    this.revision++;
    this.lastModified = new Date();
  }

  public idEquals(otherId: string): boolean {
    return this.id === otherId;
  }
}
