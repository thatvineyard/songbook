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
 *  - drop: Remove an Entry from history based on a unique identifier and revision number. 
 *  - restore: Return an Entry from history based on a unique identifier and a revision number then replace the Entry in collection with the same unique identifier. The new Entry has a new revision number and lastModified timestamp. The replaced Entry is added to history.
 *  
 *  - purge: Remove an Entry from history based on a unique identifier and revision number. 
 */
export class Database<T extends object> {
  name: string;
  collection: Entry<T>[];
  history: Entry<T>[];
  idGenerator: IdGenerator;

  constructor(name: string) {
    this.name = name;
    this.collection = [];
    this.history = [];
    this.idGenerator = new IdGenerator(name);
  }

  //=========================================================================//
  /** COLLECTION
   * - getAll
   * - get
   * - put
   * - post
   * - has 
   * - getIndex
   * - size
   * ========== Private ============
   * - create
   * - update
   */
  //=========================================================================//
  private create(data: T): Entry<T> {
    let entry = new Entry<T>(data, this.idGenerator);
    this.collection.push(entry);
    return entry;
  }

  private update(id: string, data: T | null): Entry<T> | null {
    let entry = this.get(id);
    if (entry) {
      entry.update(data);
    }
    return entry;
  }

  public get(id: string): Entry<T> | null {
    let result: Entry<T> | null = null;

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


  public getAll() {
    return this.collection;
  }

  public getIndex() {
    return this.collection.map((entry: Entry<T>) => {
      return entry.getId();
    });
  }

  public post(data: T): Entry<T> {
    return this.create(data);
  }

  public put(id: string, data: T | null): Entry<T> | null {
    if (this.has(id)) {
      return this.update(id, data);
    } else {
      return null;
    }
  }

  public delete(id: string): Entry<T> | null {
    if (this.has(id)) {
      return this.put(id, null);
    } else {
      return null;
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

  //=========================================================================//
  /** HISTORY
   * - dropRevision
   * - recoverRevision
   * - restoreRevision
   * - recoverAllRevisions
   * - saveRevision
   * - historySize
   * ========== Private ============
   * - enforceRevisionHistoryLimit
   * - getEarliestRevisionNumber 
   */
  //=========================================================================//
  private enforceRevisionHistoryLimit(id: string) {
    let entryRevisions = this.history.filter(
      (entry: Entry<T>) => entry.getId() === id
    );
    if (entryRevisions.length > databaseConstants.maxRevisionHistory) {
      let earliestRevision = this.getEarliestRevisionNumber(entryRevisions);
    }
  }

  public dropRevision(id: string, revision: number): void {
    this.history = this.history.filter((entry: Entry<T>) => {
      if (entry.getId() === id) {
        if (entry.revision === revision) {
          return false;
        }
      }
      return true;
    });
  }

  public recoverRevision(id: string, revision: number): Entry<T> | null {
    let result = this.history.filter((entry: Entry<T>) => {
      if (entry.getId() === id && entry.revision === revision) {
        return true;
      }
      return false;
    }, this);
    return result[0] || null;
  }

  public recoverAllRevisions(id: string): Entry<T>[] {
    let result = this.history.filter((entry: Entry<T>) => {
      if (entry.getId() === id) {
        return true;
      }
      return false;
    });
    return result;
  }

  public restoreRevision(id: string, revision: number): Entry<T> | null {
    let recoveredEntry: Entry<T> | null = this.recoverRevision(id, revision);
    if (recoveredEntry != null && recoveredEntry.entryData != null) {
      return this.put(id, Object.assign<T, T>(Object.create(recoveredEntry.entryData), recoveredEntry.entryData!));
    } else {
      return null;
    }
  }

  private getEarliestRevisionNumber(entryRevisions: Entry<T>[]) {
    let minRevision: number = Infinity;
    entryRevisions.forEach((entry: Entry<T>) => {
      if (minRevision === undefined || entry.revision < minRevision) {
        minRevision = entry.revision;
      }
    }, this);
    return minRevision;
  }

  public saveRevision(id: string): void {
    let oldEntry: Entry<T> = Object.assign(
      Object.create(this.get(id)),
      this.get(id)
    ) as Entry<T>;
    this.history.push(oldEntry);
    this.enforceRevisionHistoryLimit(oldEntry.getId());
  }

  public historySize(): number {
    return this.history.length;
  }

  //=========================================================================//
  /**
   * MISC
   * - purge
   * - getStats
   * - log[Brief|Verbose]
   */
  //=========================================================================//
  public purge(id: string): void {
    if (this.has(id)) {
      this.collection = this.collection.filter((entry: Entry<T>) => {
        return (entry.getId() !== id);
      })
      this.history = this.collection.filter((entry: Entry<T>) => {
        return (entry.getId() !== id);
      })
    }
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
    console.groupEnd();
    console.group("History");
    if (this.history.length != 0) {
      console.table(this.history);
    } else {
      console.info("History is empty");
    }
    console.groupEnd();
  }
}
