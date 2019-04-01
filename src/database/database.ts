import { Song } from "../models/song";
import { Entry } from "./entry";
import { Artist } from "../models/artist";
import { Melody } from "../models/melody";
import colors from 'colors';
import { IdGenerator } from "./id";

export class DatabaseHandler {
  private static _instance: DatabaseHandler;

  private songDatabase: Database;
  private melodyDatabase: Database;
  private artistDatabase: Database;

  private constructor() {
    this.songDatabase = new Database("song");
    this.postSong("Old song", "Oldman", "Oldies");
    console.debug(colors.cyan("# Song Database"));
    console.debug(this.getSongsIndex());
    console.debug();

    this.melodyDatabase = new Database("melody");
    console.debug(colors.cyan("# Melody Database"));
    console.debug(this.getMelodiesIndex());
    console.debug();

    this.artistDatabase = new Database("aritst");
    this.postArtist("Carl", "Wangman");
    console.debug(colors.cyan("# Artist Database"));
    console.debug(this.getArtistsIndex());
    console.debug();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // SONG
  public postSong(title: string, artist: string, melody: string): string {
    let song = new Song(title, artist, melody);
    return this.songDatabase.post(song);
  }

  public putSong(id: string, title: string, artist: string, melody: string): Entry | null {
    let song = new Song(title, artist, melody);
    this.songDatabase.save(id);
    return this.songDatabase.put(id, song);
  }
  
  public patchSong(id: string, title?: string, artist?: string, melody?: string): Entry | null {
    let entry = this.songDatabase.get(id);
    if (entry) {
      let song: Song = entry.entryData as Song;
      this.songDatabase.save(id);
      if(title) {
        song.title = title;
      }
      if(artist) {
        song.artist = artist;
      }
      if(melody) {
        song.melody = melody;
      }
      return this.songDatabase.put(id, song);
    } else {
      return null;
    }
  }

  public deleteSong(id: string) {
    this.songDatabase.save(id);
    return this.songDatabase.delete(id);
  }

  public hasSong(id: string) {
    return this.songDatabase.has(id);
  }

  public getSong(id: string): Entry | null {
    return this.songDatabase.get(id);
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
    return this.artistDatabase.get(id);
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
    return this.melodyDatabase.get(id);
  }

  public getMelodies() {
    return this.melodyDatabase.getCollection();
  }

  public getMelodiesIndex() {
    return this.melodyDatabase.getIndex();
  }
}

class Database {
  name: string;
  entries: Entry[];
  removedEntries: Entry[];
  idGenerator: IdGenerator;

  constructor(name: string) {
    this.name = name;
    this.entries = [];
    this.removedEntries = [];
    this.idGenerator = new IdGenerator(name);
  }

  public create(data: object): Entry {
    let entry = new Entry(data, this.idGenerator);
    this.entries.push(entry);
    return entry;
  }

  public save(id: string): void {
    let oldEntry = {...this.get(id)} as Entry;
    this.removedEntries.push(oldEntry);
    console.dir({removedEntries: this.removedEntries}, {depth: null});
  }

  public update(id: string, data: object): Entry | null {
    let entry = this.get(id)
    if (entry) {
      entry.update(data);
    }
    return entry;
  }

  public get(id: string): Entry | null {
    let result: Entry | null = null;

    this.entries.forEach(entry => {
      if (entry.idEquals(id)) {
        result = entry;
      }
    });

    return result;
  }

  public getCollection() {
    return this.entries;
  }

  public getIndex() {
    return this.entries.map((entry: Entry) => {
      return entry.getId();
    });
  }

  public post(data: object): string {
    return this.create(data).getId();
  }

  public put(id: string, data: object): Entry | null {
    if (this.has(id)) {
      return this.update(id, data);
    } else {
      return null;
    }
  }

  public delete(id: string) {
    if (this.has(id)) {
      this.entries = this.entries.filter(entry => {
        return !entry.idEquals(id);
      });
      return true;
    } else {
      return false;
    }
  }

  public has(id: string) {
    let result = false;
    this.entries.forEach(entry => {
      if (entry.idEquals(id)) {
        result = true;
      }
    });
    return result;
  }
}
