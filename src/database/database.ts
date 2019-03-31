import { Entry } from "./entry";
import { entryData } from "./entryData";
import { songEntryData } from "./songEntryData";
import { id } from "./id";

export class DatabaseHandler {
  private static _instance: DatabaseHandler;

  private songDatabase: Entry[];
  private melodyDatabase: Entry[];
  private artistDatabase: Entry[];

  private constructor() {
    this.songDatabase = [];
    this.createSong(new songEntryData("Old song"));
    console.debug("# Song Database");
    console.debug(this.getSongsIndex());
    console.debug();

    this.melodyDatabase = [];
    // this.
    console.debug("# Melody Database");
    console.debug(this.getMelodiesIndex());
    console.debug();

    this.artistDatabase = [];
    console.debug("# Artist Database");
    console.debug(this.getArtistsIndex());
    console.debug();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private createSong(entryData: songEntryData) {
    this.songDatabase.push(new Entry(entryData));
  }

  public postSong(title: string) {
    let songEntry = new Entry(new songEntryData(title || ""));
    this.songDatabase.push(songEntry);
    console.log("Posting song (" + songEntry.id + ")");
    return songEntry.id;
  }

  public deleteSong(id: string) {
    if (this.hasSong(id)) {
      this.songDatabase = this.songDatabase.filter(entry => {
        return !entry.idEquals(id);
      });
      return true;
    } else {
      return false;
    }
  }

  public hasSong(id: string) {
    let result = false;
    this.songDatabase.forEach(entry => {
      if (entry.idEquals(id)) {
        result = true;
      }
    });
    return result;
  }

  public songCount(id: string) {
    let index = 0;
    let result = -1;
    this.songDatabase.forEach(entry => {
      index++;
      if (entry.id.toString() === id.toString()) {
        result = index;
      }
    });
    return result;
  }

  public getSongs() {
    return this.songDatabase;
  }

  private getId(entry: Entry) {
    return entry.id;
  }

  public getSongsIndex() {
    return this.songDatabase.map(this.getId);
  }

  public getArtistsIndex() {
    return this.artistDatabase.map(this.getId);
  }

  public getMelodiesIndex() {
    return this.melodyDatabase.map(this.getId);
  }
}
