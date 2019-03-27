import { randomBytes } from "crypto";

export class id {

  private type: string;
  private id: string;

  constructor(type: string) {
    this.type = type;
    this.id = this.generateId();
  }

  private generateId(): string {
    return randomBytes(4).toString('hex');
  }

  public toString(): string {
    return this.type.substr(0, 1) + '-' + this.id;
  }
}