import { randomBytes } from "crypto";
import serverConstants from "../constants/serverConstants";

export class IdGenerator {
  private memory: Id[];
  private iterator: number;
  private prefix: string;

  constructor(prefix?: string) {
    this.memory = [];
    this.iterator = 0;
    this.prefix = prefix || "";
  }

  public generate(): Id {
    let result: Id;
    switch (serverConstants.idGeneration) {
      case "incremental":
        result = new Id(this.prefix, this.iterator.toString());
        this.iterator++;
        break;
      case "random":
      default:
        result = new Id(this.prefix, randomBytes(4).toString("hex"));
        break;
    }
    
    if (this.memory.indexOf(result)  === -1) {
      this.memory.push(result);
      return result;
    } else {
      return this.generate();
    }
  }

}

export class Id {
  private type: string;
  private index: string;

  constructor(type: string, index: string) {
    this.type = type;
    this.index = index;
  }

  public toString(): string {
    return this.type + "-" + this.index;
  }

  public toJSON() {
    return this.toString();
  }
}
