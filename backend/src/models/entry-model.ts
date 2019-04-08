import { Entry } from "../database/entry";
import { Id } from "database/id";

export class EntryModel<T extends object> {
  id: string;
  type: string;
  revision: number;
  created: Date;
  lastModified: Date;
  entryData: T | null;

  constructor(id: string, type: string, revision: number, created: Date, lastModified: Date, entryData: T | null) {
    this.id = id;
    this.type = type;
    this.revision = revision;
    this.created = created;
    this.lastModified = lastModified;
    this.entryData = entryData;
  }
}