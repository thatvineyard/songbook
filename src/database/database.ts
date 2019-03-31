import { Song } from "../models/song";
import { Entry } from "./entry";
import { Artist } from "../models/artist";
import { Melody } from "../models/melody";

export class DatabaseHandler {
  private static _instance: DatabaseHandler;

  private songDatabase: Database;
  private melodyDatabase: Database;
  private artistDatabase: Database;

  private constructor() {
    this.songDatabase = new Database();
    this.postSong("Old song");
    console.debug("# Song Database");
    console.debug(this.getSongsIndex());
    console.debug();

    this.melodyDatabase = new Database();
    console.debug("# Melody Database");
    console.debug(this.getMelodiesIndex());
    console.debug();

    this.artistDatabase = new Database();
    this.postArtist("Carl", "Wangman");
    console.debug("# Artist Database");
    console.debug(this.getArtistsIndex());
    console.debug();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // SONG
  public postSong(title: string): string {
    let song = new Song(title);
    return this.songDatabase.post(song);
  }

  public deleteSong(id: string) {
    return this.songDatabase.delete(id);
  }

  public hasSong(id: string) {
    return this.songDatabase.has(id);
  }

  public getSong(id: string): Entry | null {
    return this.songDatabase.getEntry(id);
  }

  public getSongs() {
    return this.songDatabase.getCollection();
  }

  public getSongsIndex() {
    return this.songDatabase.getIndex();
  }

  // ARTIST
  public postArtist(firstName: string, lastName: string) {
    let artist = new Artist(firstName, lastName);
    return this.artistDatabase.post(artist);
  }

  public deleteArtist(id: string) {
    return this.artistDatabase.delete(id);
  }

  public hasArtist(id: string): boolean {
    return this.artistDatabase.has(id);
  }

  public getArtist(id: string): Entry | null {
    return this.artistDatabase.getEntry(id);
  }

  public getArtists() {
    return this.artistDatabase.getCollection();
  }

  public getArtistsIndex() {
    return this.artistDatabase.getIndex();
  }

  // MELODY
  public postMelody(title: string) {
    let melody = new Melody(title);
    return this.melodyDatabase.post(melody);
  }

  public deleteMelody(id: string) {
    return this.melodyDatabase.delete(id);
  }

  public hasMelody(id: string): boolean {
    return this.melodyDatabase.has(id);
  }

  public getMelody(id: string): Entry | null {
    return this.melodyDatabase.getEntry(id);
  }

  public getMelodies() {
    return this.melodyDatabase.getCollection();
  }

  public getMelodiesIndex() {
    return this.melodyDatabase.getIndex();
  }
}

class Database {
  entryList: Entry[];

  constructor() {
    this.entryList = [];
  }

  public create(data: object): Entry {
    let entry = new Entry(data);
    this.entryList.push(new Entry(data));
    return entry;
  }

  public getEntry(id: string): Entry | null {
    let result: Entry | null = null;

    this.entryList.forEach(entry => {
      if (entry.id === id) {
        result = entry;
      }
    });

    return result;
  }

  public getCollection() {
    return this.entryList;
  }

  public getIndex() {
    return this.entryList.map((entry: Entry) => {
      return entry.id;
    });
  }

  public post(data: object): string {
    return this.create(data).id;
  }

  public delete(id: string) {
    if (this.has(id)) {
      this.entryList = this.entryList.filter(entry => {
        return !entry.idEquals(id);
      });
      return true;
    } else {
      return false;
    }
  }

  public has(id: string) {
    let result = false;
    this.entryList.forEach(entry => {
      if (entry.idEquals(id)) {
        result = true;
      }
    });
    return result;
  }
}
