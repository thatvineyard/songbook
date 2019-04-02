import databaseConstants from "../constants/databaseConstants";
import { Entry } from "./entry";
import { IdGenerator } from "./id";
import colors from "colors";

/**
 * 
 * Glossary:
 *  - 
 *  
 *  - get: Return an Entry from collection based on a unique identifier
 *  - post: Create a new Entry from collection with a new unique identifier with a given object.
 *  - put: Replace an Entry from collection based on a unique identifier with a given object. The new Entry has a new revision number and lastModified timestamp. The replaced Entry is added to history.
 *  - patch: Replace an Entry from collection based on a unique identifier with a given field. The new Entry has a new revision number and lastModified timestamp. The replaced Entry is added to history.
 *  - delete: Remove an Entry from collection based on a unique identifier. The removed Entry is added to history. 
 * 
 *  - recover: Return an Entry from history based on a unique identifier and a revision number. 
 *  - purge: Remove an Entry from history based on a unique identifier and revision number. 
 *  - restore: Return an Entry from history based on a unique identifier and a revision number then replace the Entry in collection with the same unique identifier. The new Entry has a new revision number and lastModified timestamp. The replaced Entry is added to history.
 */
export class Database {
  name: string;
  collection: Entry[];
  history: Entry[];
  idGenerator: IdGenerator;

  constructor(name: string) {
    this.name = name;
    this.collection = [];
    this.history = [];
    this.idGenerator = new IdGenerator(name);
  }

  public create(data: object): Entry {
    let entry = new Entry(data, this.idGenerator);
    this.collection.push(entry);
    return entry;
  }

  private enforceRevisionHistoryLimit(id: string) {
    let entryRevisions = this.history.filter(
      (entry: Entry) => entry.getId() === id
    );
    if (entryRevisions.length > databaseConstants.maxRevisionHistory) {
      let earliestRevision = this.getEarliestRevisionNumber(entryRevisions);
    }
  }

  public purge(id: string, revision: number): void {
    this.history = this.history.filter((entry: Entry) => {
      if (entry.getId() === id) {
        if (entry.revision === earliestRevision) {
          return false;
        }
      }
      return true;
    });
  }

  public recover(id: string, revision: number): Entry | null {
    this.history = this.history.filter((entry: Entry) => {
      if (entry.getId() === id) {
        if (entry.revision === earliestRevision) {
          return false;
        }
      }
      return true;
    });
  }

  public restore(id: string, revision: number): Entry | null {
    this.put(this.recover(id, revision));
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

    this.collection.forEach(entry => {
      if (entry.idEquals(id)) {
        result = entry;
      }
    });

    return result;
  }

  public size(): number {
    return this.collection.length;
  }

  public historySize(): number {
    return this.history.length;
  }

  public getCollection() {
    return this.collection;
  }

  public getIndex() {
    return this.collection.map((entry: Entry) => {
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
      this.collection = this.collection.filter(entry => {
        return !entry.idEquals(id);
      });
      return true;
    } else {
      return false;
    }
  }

  public has(id: string) {
    let result = false;
    this.collection.forEach(entry => {
      if (entry.idEquals(id)) {
        result = true;
      }
    });
    return result;
  }

  public getStats() {
    return {
      collectionSize: this.size(),
      historySize: this.historySize()
    };
  }

  public logBrief() {
    console.info(colors.cyan("# " + this.name + " Database"));
    console.table(this.getStats());
    if (this.size() != 0) {
      console.table(this.getIndex());
    } else {
      console.info("Collection is empty");
    }
  }

  public logVerbose() {
    console.info(colors.cyan("# " + this.name + " Database"));
    console.groupCollapsed("Collection");
    console.table(this.getStats());
    if (this.collection.length != 0) {
      console.table(this.collection);
    } else {
      console.info("Collection is empty");
    }
    console.groupEnd("Collection");
    console.group("History");
    if (this.history.length != 0) {
      console.table(this.history);
    } else {
      console.info("History is empty");
    }
    console.groupEnd("History");
  }
}
