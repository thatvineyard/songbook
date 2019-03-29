import { entryData } from "./entryData";

export class songEntryData implements entryData {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  getType() {
    return "song";
  }
}
