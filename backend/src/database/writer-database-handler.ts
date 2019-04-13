import { Database } from './database';
import { Writer } from "../objects/writer";
import { WriterModel } from "../models/writer-model";
import { Entry } from "./entry";
import { lstat, write } from 'fs';

export class WriterDatabaseHandler {
  private static _instance: WriterDatabaseHandler;

  private writerDatabase: Database<Writer>;

  private constructor() {
    this.writerDatabase = new Database<Writer>("writer");
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // Writer
  public post(writerModel: WriterModel): Entry<WriterModel> | null {
    let writer = this.writerModelToObject(writerModel);

    if (!writer) {
      return null;
    }
    // do
    let result: Entry<Writer> | null = this.writerDatabase.post(writer);

    // convert to model
    return this.writerToModelInEntry(result);
  }

  public put(
    id: string,
    writerModel: WriterModel
  ): Entry<WriterModel> | null {
    if (this.writerDatabase.has(id)) {
      return null;
    }
    this.writerDatabase.saveRevision(id);

    // convert to object
    let writer = this.writerModelToObject(writerModel);

    if (!writer) {
      return null;
    }

    // do
    let result: Entry<Writer> | null = this.writerDatabase.put(id, writer);

    // convert to model
    if (!result) {
      return null;
    }
    return this.writerToModelInEntry(result);
  }

  public patch(
    id: string,
    firstName?: string,
    lastName?: string,
  ): Entry<WriterModel> | null {
    if (this.writerDatabase.has(id)) {
      let entry = this.writerDatabase.get(id);
      if (entry) {
        let writer: Writer = entry.entryData as Writer;
        this.writerDatabase.saveRevision(id);
        if (firstName) {
          writer.firstName = firstName;
        }
        if (lastName) {
          writer.lastName = lastName;
        }
        let result: Entry<Writer> | null = this.writerDatabase.put(id, writer);
        if (result) {
          return this.writerToModelInEntry(result);
        }
      }
    }
    return null;
  }

  public delete(id: string): Entry<WriterModel> | null {
    if (this.writerDatabase.has(id)) {
      this.writerDatabase.saveRevision(id);
      let result = this.writerDatabase.delete(id);
      if (result) {
        return this.writerToModelInEntry(result);
      }
    }
    return null;
  }

  public has(id: string): boolean {
    return this.writerDatabase.has(id);
  }

  public get(id: string): Entry<WriterModel> | null {
    let result: Entry<Writer> | null = this.writerDatabase.get(id) as Entry<Writer>;

    // convert to model
    if (result) {
      return this.writerToModelInEntry(result);
    } else {
      return null;
    }
  }

  public getAll(): Entry<WriterModel>[] {
    let result: Entry<Writer>[] = this.writerDatabase.getAll();

    return result.map((entry: Entry<Writer>) => {
      return this.writerToModelInEntry(entry);
    });
  }

  public getIndex() {
    return this.writerDatabase.getIndex();
  }

  public recoverRevision(id: string, revision: number) {
    let result = this.writerDatabase.recoverRevision(id, revision);

    if (result) {
      return this.writerToModelInEntry(result);
    } else {
      return null;
    }
  }

  public dropRevision(id: string, revision: number): void {
    return this.writerDatabase.dropRevision(id, revision);
  }

  public recoverAllRevisions(id: string): Entry<WriterModel>[] {
    let result = this.writerDatabase.recoverAllRevisions(id);

    return result.map((entry: Entry<Writer>) => {
      return this.writerToModelInEntry(entry);
    });

  }

  public purge(id: string): void {
    return this.writerDatabase.purge(id);
  }

  private writerToModel(writer: Writer | null): WriterModel | null {
    if (writer) {
      return new WriterModel(writer.firstName, writer.lastName);
    } else {
      return null;
    }
  }

  private writerToModelInEntry(entry: Entry<Writer>): Entry<WriterModel> {
    entry.entryData = this.writerToModel(entry.entryData);
    return entry as Entry<WriterModel>;
  }


  private writerModelToObject(writerModel: WriterModel): Writer | null {
    if (!writerModel.firstName || !writerModel.lastName) {
      return null;
    }

    return new Writer(writerModel.firstName, writerModel.lastName);

  }
}