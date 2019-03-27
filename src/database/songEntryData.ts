import { entryData } from "./entryData";

export class songEntryData implements entryData {

  getType() {
    return "song";
  }
}