import { Entry } from "./entry";
import { entryData } from "./entryData";
import { songEntryData } from "./songEntryData";
import { id } from "./id";

export class databaseHandler {
  private static _instance: databaseHandler;

  private songDatabase: Entry[];
  private melodyDatabase: Entry[];
  private artistDatabase: Entry[];

  private constructor() {
    this.songDatabase = [];
    this.melodyDatabase = [];
    this.artistDatabase = [];
    this.createSong(new songEntryData());
    console.log(this.getSongsIndex());
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public createSong(entryData: songEntryData) {
    this.songDatabase.push(new Entry(entryData));
  }

  public hasSong(id: id) {
    this.songDatabase.forEach(entry => {
      if (entry.id.toString() === id.toString()) {
        return true;
      }
    });
    return false;
  }

  public getSongs() {
    return this.songDatabase;
  }

  private getIndex(entry: Entry) {
    return entry.id;
  }

  public getSongsIndex() {
    return this.songDatabase.map(this.getIndex);
  }
}
