import databaseConstants from "../constants/databaseConstants";
import { Entry } from "./entry";
import { IdGenerator } from "./id";

export class Database {
  name: string;
  entries: Entry[];
  history: Entry[];
  idGenerator: IdGenerator;

  constructor(name: string) {
    this.name = name;
    this.entries = [];
    this.history = [];
    this.idGenerator = new IdGenerator(name);
  }

  public create(data: object): Entry {
    let entry = new Entry(data, this.idGenerator);
    this.entries.push(entry);
    return entry;
  }

  private enforceRevisionHistoryLimit(id: string) {
    let entryRevisions = this.history.filter(
      (entry: Entry) => entry.getId() === id
    );
    if (entryRevisions.length > databaseConstants.maxRevisionHistory) {
      let earliestRevision = this.getEarliestRevisionNumber(entryRevisions);
      this.history = this.history.filter((entry: Entry) => {
        if (entry.getId() === id) {
          if (entry.revision === earliestRevision) {
            return false;
          }
        }
        return true;
      });
    }
  }

  private getEarliestRevisionNumber(entryRevisions: Entry[]) {
    let minRevision: number = Infinity;
    entryRevisions.forEach((entry: Entry) => {
      if (minRevision === undefined || entry.revision < minRevision) {
        minRevision = entry.revision;
      }
    }, this);
    return minRevision;
  }

  public save(id: string): void {
    let oldEntry: Entry = Object.assign(
      Object.create(this.get(id)),
      this.get(id)
    ) as Entry;
    this.history.push(oldEntry);
    this.enforceRevisionHistoryLimit(oldEntry.getId());
    console.dir({ removedEntries: this.history }, { depth: null });
  }

  public update(id: string, data: object): Entry | null {
    let entry = this.get(id);
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

  public size(): number {
    return this.entries.length;
  }

  private historySize(): number {
    return this.entries.length;
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
