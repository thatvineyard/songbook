import { populateSongs } from "./populate";
import { Database } from './database';
import { Song, Stanza } from "../objects/song";
import { SongModel, StanzaModel } from "../models/song-model";
import { Entry } from "./entry";

export class SongDatabaseHandler {
  private static _instance: SongDatabaseHandler;

  private songDatabase: Database<Song>;

  private constructor() {
    this.songDatabase = new Database<Song>("song");
    populateSongs(this, 10, 0, 2);
    this.songDatabase.logBrief();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // SONG
  public post(songModel: SongModel): Entry<SongModel> | null {
    let stanzas: Stanza[] = songModel.stanzas.reduce((results: Stanza[], stanzaModel: StanzaModel) => {
      results.push(new Stanza(stanzaModel.type, stanzaModel.lines));
      return results;
    }, [] as Stanza[]);
    let song = new Song(songModel.title, songModel.artist, songModel.melody, stanzas);

    // do
    let result: Entry<Song> | null = this.songDatabase.post(song);

    // convert to model
    return this.songToModelInEntry(result);
  }

  public put(
    id: string,
    songModel: SongModel
  ): Entry<SongModel> | null {
    if (this.songDatabase.has(id)) {
      this.songDatabase.saveRevision(id);
      // convert to object
      let song = new Song(songModel.title, songModel.artist, songModel.melody, songModel.stanzas);

      // do
      let result: Entry<Song> | null = this.songDatabase.put(id, song);

      // convert to model
      if (result) {
        return this.songToModelInEntry(result);
      }
    }
    return null;
  }

  public patch(
    id: string,
    title?: string,
    artist?: string,
    melody?: string
  ): Entry<SongModel> | null {
    if (this.songDatabase.has(id)) {
      let entry = this.songDatabase.get(id);
      if (entry) {
        let song: Song = entry.entryData as Song;
        this.songDatabase.saveRevision(id);
        if (title) {
          song.title = title;
        }
        if (artist) {
          song.artist = artist;
        }
        if (melody) {
          song.melody = melody;
        }
        let result: Entry<Song> | null = this.songDatabase.put(id, song);
        if (result) {
          return this.songToModelInEntry(result);
        }
      }
    }
    return null;
  }

  public delete(id: string): Entry<SongModel> | null {
    if (this.songDatabase.has(id)) {
      this.songDatabase.saveRevision(id);
      let result = this.songDatabase.delete(id);
      if (result) {
        return this.songToModelInEntry(result);
      }
    }
    return null;
  }

  public has(id: string): boolean {
    return this.songDatabase.has(id);
  }

  public get(id: string): Entry<SongModel> | null {
    let result: Entry<Song> | null = this.songDatabase.get(id) as Entry<Song>;

    // convert to model
    if (result) {
      return this.songToModelInEntry(result);
    } else {
      return null;
    }
  }

  public getAll(): Entry<SongModel>[] {
    let result: Entry<Song>[] = this.songDatabase.getAll();

    return result.map((entry: Entry<Song>) => {
      return this.songToModelInEntry(entry);
    });
  }

  public getIndex() {
    return this.songDatabase.getIndex();
  }

  public recoverRevision(id: string, revision: number) {
    let result = this.songDatabase.recoverRevision(id, revision);

    if (result) {
      return this.songToModelInEntry(result);
    } else {
      return null;
    }
  }

  public dropRevision(id: string, revision: number): void {
    return this.songDatabase.dropRevision(id, revision);
  }

  public recoverAllRevisions(id: string): Entry<SongModel>[] {
    let result = this.songDatabase.recoverAllRevisions(id);

    return result.map((entry: Entry<Song>) => {
      return this.songToModelInEntry(entry);
    });

  }

  public purge(id: string): void {
    return this.songDatabase.purge(id);
  }

  private songToModel(song: Song | null): SongModel | null {
    if (song) {
      return new SongModel(song.title, song.artist, song.melody, song.stanzas);
    } else {
      return null;
    }
  }

  private songToModelInEntry(entry: Entry<Song>): Entry<SongModel> {
    entry.entryData = this.songToModel(entry.entryData);
    return entry as Entry<SongModel>;
  }
}