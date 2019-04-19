import { Database } from './database';
import { Song, Stanza } from '../objects/song';
import { SongModel, StanzaModel } from '../models/song-model';
import { Entry } from './entry';
import { DatabaseAccessor } from './database-accessor';

export const SONG_DATABASE_NAME: string = 'song';

export class SongDatabaseAccessor implements DatabaseAccessor<SongModel> {
  private static INSTANCE: SongDatabaseAccessor;

  private songDatabase: Database<Song>;

  private constructor() {
    this.songDatabase = new Database<Song>(SONG_DATABASE_NAME);
  }

  public static get Instance() {
    return this.INSTANCE || (this.INSTANCE = new this());
  }

  // SONG
  public post(songModel: SongModel): Entry<SongModel> | null {
    const song = this.songModelToObject(songModel);

    if (!song) {
      return null;
    }

    // do
    const result: Entry<Song> | null = this.songDatabase.post(song);

    // convert to model
    return this.songToModelInEntry(result);
  }

  public put(
    id: string,
    songModel: SongModel,
  ): Entry<SongModel> | null {
    if (!this.songDatabase.has(id)) {
      return null;
    }

    // save
    this.songDatabase.saveRevision(id);

    // convert to object
    const song = this.songModelToObject(songModel);

    if (!song) {
      return null;
    }

    // do
    const result: Entry<Song> | null = this.songDatabase.put(id, song);

    // convert to model
    if (result) {
      return this.songToModelInEntry(result);
    }
    return null;

  }

  public patch(
    id: string,
    title?: string,
    artist?: string,
    melody?: string,
  ): Entry<SongModel> | null {
    if (this.songDatabase.has(id)) {
      const entry = this.songDatabase.get(id);
      if (entry) {
        const song: Song = entry.entryData as Song;
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
        const result: Entry<Song> | null = this.songDatabase.put(id, song);
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
      const result = this.songDatabase.delete(id);
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
    const result: Entry<Song> | null = this.songDatabase.get(id) as Entry<Song>;

    // convert to model
    if (result) {
      return this.songToModelInEntry(result);
    }

    return null;

  }

  public getAll(): Entry<SongModel>[] {
    const result: Entry<Song>[] = this.songDatabase.getAll();

    return result.map((entry: Entry<Song>) => {
      return this.songToModelInEntry(entry);
    });
  }

  public getIndex() {
    return this.songDatabase.getIndex();
  }

  public recoverRevision(id: string, revision: number) {
    const result = this.songDatabase.recoverRevision(id, revision);

    if (result) {
      return this.songToModelInEntry(result);
    }
  }

  public dropRevision(id: string, revision: number): void {
    return this.songDatabase.dropRevision(id, revision);
  }

  public recoverAllRevisions(id: string): Entry<SongModel>[] {
    const result = this.songDatabase.recoverAllRevisions(id);

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

    const stanzaModel = new StanzaModel(stanza.type, stanza.lines);

    return stanzaModel;
  }

  public stanzaArrayToModelArray(stanzas: Stanza[]): StanzaModel[] {
    const stanzaModels: StanzaModel[] = stanzas.reduce((results: StanzaModel[], stanza: Stanza) => {
      const stanzaModel = this.stanzaToModel(stanza);
      if (!stanzaModel) {
        return results;
      }
      results.push(stanzaModel);
      return results;
    },                                                 [] as StanzaModel[]);
    return stanzaModels;
  }

  private songToModel(song: Song | null): SongModel | null {
    if (!song) {
      return null;
    }

    const songModel = new SongModel(song.title);
    songModel.melodyRef = song.melody;
    songModel.writerRef = song.artist;
    // songModel.writerRef = song.artist;

    const stanzaModel = this.stanzaArrayToModelArray(song.stanzas);

    songModel.stanzas = song.stanzas;
    return songModel;
  }

  private songToModelInEntry(entry: Entry<Song>): Entry<SongModel> {
    const newEntry: Entry<Object> = Object.assign(
      Object.create(entry),
      entry,
    ) as Entry<Object>;
    newEntry.entryData = this.songToModel(entry.entryData);
    return newEntry as Entry<SongModel>;
  }

  private stanzaModelToObject(stanzaModel: StanzaModel): Stanza | null {
    if (!stanzaModel.type || !stanzaModel.lines) {
      return null;
    }
    return new Stanza(stanzaModel.type, stanzaModel.lines);
  }

  private stanzaModelArrayToObjectArray(stanzaModels: StanzaModel[]): Stanza[] {
    const stanzas: Stanza[] = stanzaModels.reduce((results: Stanza[], stanzaModel: StanzaModel) => {
      const stanza = this.stanzaModelToObject(stanzaModel);
      if (!stanza) {
        return results;
      }
      results.push(stanza);
      return results;
    },                                            [] as Stanza[]);
    return stanzas;
  }

  private songModelToObject(songModel: SongModel): Song | null {
    if (!songModel.title || !songModel.writerRef || !songModel.melodyRef || !songModel.stanzas) {
      return null;
    }

    const stanzas = this.stanzaModelArrayToObjectArray(songModel.stanzas);

    if (!stanzas) {
      return null;
    }

    return new Song(songModel.title, songModel.writerRef, songModel.melodyRef, stanzas);

  }
}
