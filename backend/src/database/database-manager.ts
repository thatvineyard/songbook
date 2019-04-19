import { EntryModel } from '../models/entry-model';
import { SongModel } from '../models/song-model';
import { WriterModel } from '../models/writer-model';
import { Writer } from '../objects/writer';
import { Melody } from '../objects/melody';
import { Database } from './database';
import { Entry } from './entry';
import { populate } from './populate';
import { SongDatabaseAccessor, SONG_DATABASE_NAME } from './song-database-accessor';
import { WriterDatabaseAccessor, WRITER_DATABASE_NAME } from './writer-database-accessor';
import { Model } from 'models/model';
import { Song } from 'objects/song';

const DEFAULT_DEREFERENCE: boolean = true;

/**
 * This class is the main entrypoint for all database actions.
 * It is mostly responsible for sending requests to the appropriate database handler
 * as well as creating models of the entry that is returned.
 * The data in the entry should already be modelled by the individual database handler.
 *
 *
 */
export class DatabaseManager {
  private static INSTANCE: DatabaseManager;

  private songDatabase: SongDatabaseAccessor;
  // private melodyDatabase: Database<Melody>;
  private writerDatabase: WriterDatabaseAccessor;

  private constructor() {
    this.songDatabase = SongDatabaseAccessor.Instance;
    // this.melodyDatabase = MelodyDatabaseHandler.Instance;
    this.writerDatabase = WriterDatabaseAccessor.Instance;
  }

  public static get Instance() {
    return this.INSTANCE || (this.INSTANCE = new this());
  }

  // GENERIC
  public get(id: string): EntryModel<Model> | null {
    if (this.hasSong(id)) {
      return this.getSong(id);
    }
    if (this.hasWriter(id)) {
      return this.getWriter(id);
    }
    return null;
  }

  // SONG
  public postSong(songModel: SongModel): EntryModel<SongModel> | null {
    const result: Entry<SongModel> | null = this.songDatabase.post(songModel);

    return this.entryToModel(result);
  }

  public putSong(
    id: string,
    songModel: SongModel,
  ): EntryModel<SongModel> | null {
    const result: Entry<SongModel> | null = this.songDatabase.put(id, songModel);
    return this.entryToModel(result);
  }

  public patchSong(
    id: string,
    title?: string,
    writer?: string,
    melody ?: string,
  ): EntryModel<SongModel> | null {
    const result: Entry<SongModel> | null = this.songDatabase.patch(id, title, writer, melody);
    return this.entryToModel(result);
  }

  public deleteSong(id: string) {
    return this.songDatabase.delete(id);
  }

  public hasSong(id: string) {
    return this.songDatabase.has(id);
  }

  public getSong(id: string): EntryModel<SongModel> | null {
    const result: Entry<SongModel> | null = this.songDatabase.get(id);
    return this.entryToModel(result);
  }

  public getSongs(): EntryModel<SongModel>[] {
    const result: Entry<SongModel>[] = this.songDatabase.getAll();
    return result.reduce((results, entry: Entry<SongModel>) => {
      const result = this.entryToModel(entry);
      if (result) {
        results.push(result);
      }
      return results;
    },                   [] as EntryModel<SongModel>[]);
  }

  public getSongsIndex() {
    return this.songDatabase.getIndex();
  }

  public recoverSongRevision(id: string, revision: number): EntryModel<SongModel> | null {
    const result = this.songDatabase.recoverRevision(id, revision);

    if (!result) {
      return null;
    }

    return this.entryToModel(result);
  }

  public dropSongRevision(id: string, revision: number): void {
    return this.songDatabase.dropRevision(id, revision);
  }

  public recoverAllSongRevisions(id: string): EntryModel<SongModel>[] {
    const result: Entry<SongModel>[] = this.songDatabase.recoverAllRevisions(id);
    return result.reduce((results, entry: Entry<SongModel>) => {
      const result = this.entryToModel(entry);
      if (result) {
        results.push(result);
      }
      return results;
    },                   [] as EntryModel<SongModel>[]);
  }

  public purgeSong(id: string) {
    return this.songDatabase.purge(id);
  }

  // Writer
  public postWriter(writerModel: WriterModel): EntryModel<WriterModel> | null {
    const result: Entry<WriterModel> | null =                          this.writerDatabase.post(writerModel);
    return this.entryToModel(result);
  }

  public putWriter(
    id: string,
    writerModel: WriterModel,
  ): EntryModel<WriterModel> | null {
    const result: Entry<WriterModel> | null = this.writerDatabase.put(id, writerModel);
    return this.entryToModel(result);
  }

  public deleteWriter(id: string) {
    return this.writerDatabase.delete(id);
  }

  public hasWriter(id: string): boolean {
    return this.writerDatabase.has(id);
  }

  public getWriter(id: string): EntryModel<WriterModel> | null {
    const result: Entry<WriterModel> | null = this.writerDatabase.get(id);
    return this.entryToModel(result);
  }

  public getWriters(): EntryModel<WriterModel>[] {
    const result: Entry<WriterModel>[] = this.writerDatabase.getAll();
    return result.reduce((results, entry: Entry<WriterModel>) => {
      const result = this.entryToModel(entry);
      if (result) {
        results.push(result);
      }
      return results;
    },                   [] as EntryModel<WriterModel>[]);
  }

  public getWritersIndex(): string[] {
    return this.writerDatabase.getIndex();
  }

  // MELODY
  // public postMelody(title: string) {
  //     let melody = new Melody(title);
  //     return this.melodyDatabase.post(melody);
  // }

  // public deleteMelody(id: string) {
  //     return this.melodyDatabase.delete(id);
  // }

  // public hasMelody(id: string): boolean {
  //     return this.melodyDatabase.has(id);
  // }

  // public getMelody(id: string): Entry<Melody> | null {
  //     return this.melodyDatabase.get(id);
  // }

  // public getMelodies() {
  //     return this.melodyDatabase.getAll();
  // }

  // public getMelodiesIndex() {
  //     return this.melodyDatabase.getIndex();
  // }

  // UTILS
  private existsIn(id: string): string[] {
    const result: string[] = [];

    if (this.hasSong(id)) {
      result.push(SONG_DATABASE_NAME);
    }
    if (this.hasWriter(id)) {
      result.push(WRITER_DATABASE_NAME);
    }

    return result;
  }

  private dereferenceModel<T extends Object>(entry: Entry<T>): void {
    console.log();
  }

  private entryToModel<T extends Object>(entry: Entry<T> | null): EntryModel<T> | null {
    if (entry) {
      return new EntryModel<T>(entry.getId(),
                               entry.type,
                               entry.revision,
                               entry.created,
                               entry.lastModified,
                               entry.entryData);
    }
    return null;
  }
}
