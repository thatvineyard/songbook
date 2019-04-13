import { Database } from './database';
import { Song, Stanza } from "../objects/song";
import { SongModel, StanzaModel } from "../models/song-model";
import { Entry } from "./entry";

export class SongDatabaseHandler {
  private static _instance: SongDatabaseHandler;

  private songDatabase: Database<Song>;

  private constructor() {
    this.songDatabase = new Database<Song>("song");
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // SONG
  public post(songModel: SongModel): Entry<SongModel> | null {
    let song = this.songModelToObject(songModel);

    if (!song) {
      return null;
    }


    console.log("POST")
    console.log(song)

    // do
    let result: Entry<Song> | null = this.songDatabase.post(song);

    // convert to model
    return this.songToModelInEntry(result);
  }


  public put(
    id: string,
    songModel: SongModel
  ): Entry<SongModel> | null {
    if (!this.songDatabase.has(id)) {
      return null;
    }

    // save
    this.songDatabase.saveRevision(id);

    // convert to object
    let song = this.songModelToObject(songModel);

    if (!song) {
      return null;
    }

    // do
    let result: Entry<Song> | null = this.songDatabase.put(id, song);

    // convert to model
    if (result) {
      return this.songToModelInEntry(result);
    } else {
      return null;
    }

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

    console.log("GET")
    console.log(result);

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

  private stanzaToModel(stanza: Stanza | null): StanzaModel | null {
    if (!stanza) {
      return null;
    }

    let stanzaModel = new StanzaModel(stanza.type, stanza.lines);

    return stanzaModel;
  }

  public stanzaArrayToModelArray(stanzas: Stanza[]): StanzaModel[] {
    let stanzaModels: StanzaModel[] = stanzas.reduce((results: StanzaModel[], stanza: Stanza) => {
      let stanzaModel = this.stanzaToModel(stanza);
      if (!stanzaModel) {
        return results;
      }
      results.push(stanzaModel);
      return results;
    }, [] as StanzaModel[]);
    return stanzaModels;
  }

  private songToModel(song: Song | null): SongModel | null {
    if (!song) {
      return null;
    }

    let songModel = new SongModel(song.title);
    songModel.melodyRef = song.melody;
    songModel.writerRef = song.artist;
    // songModel.writerRef = song.artist;

    let stanzaModel = this.stanzaArrayToModelArray(song.stanzas);

    songModel.stanzas = song.stanzas;
    return songModel;
  }


  private songToModelInEntry(entry: Entry<Song>): Entry<SongModel> {
    console.log("SHOULD BE OBJECT")
    console.log(entry);
    let newEntry: Entry<T> = Object.assign(
      Object.create(entry),
      entry
    ) as Entry<Object>;
    newEntry.entryData = this.songToModel(entry.entryData);
    console.log("SHOULD BE MODEL")
    console.log(newEntry);
    return newEntry as Entry<SongModel>;
  }

  private stanzaModelToObject(stanzaModel: StanzaModel): Stanza | null {
    if (!stanzaModel.type || !stanzaModel.lines) {
      return null;
    }
    return new Stanza(stanzaModel.type, stanzaModel.lines);
  }

  private stanzaModelArrayToObjectArray(stanzaModels: StanzaModel[]): Stanza[] {
    let stanzas: Stanza[] = stanzaModels.reduce((results: Stanza[], stanzaModel: StanzaModel) => {
      let stanza = this.stanzaModelToObject(stanzaModel);
      if (!stanza) {
        return results;
      }
      results.push(stanza);
      return results;
    }, [] as Stanza[]);
    return stanzas;
  }

  private songModelToObject(songModel: SongModel): Song | null {
    if (!songModel.title || !songModel.writerRef || !songModel.melodyRef || !songModel.stanzas) {
      return null;
    }

    let stanzas = this.stanzaModelArrayToObjectArray(songModel.stanzas);

    if (!stanzas) {
      return null;
    }

    return new Song(songModel.title, songModel.writerRef, songModel.melodyRef, stanzas);

  }
}