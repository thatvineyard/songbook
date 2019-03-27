import { entry } from "./entry";
import { entryData } from "./entryData";
import { songEntryData } from "./songEntryData";
import { id } from "./id";

export class database {

  private static _instance: database;

  private entries: entry[];

  private constructor() {
    this.entries = [];
    this.createEntry(new songEntryData());
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public createEntry(entryData: entryData) {
    this.entries.push(new entry(entryData));
  }

  public hasEntry(id: id) {
    this.entries.forEach(entry => {
      if (entry.id.toString() === id.toString()) { return true; }
    });
    return false;
  }

  public getEntries() {
    return this.entries;
  }

}