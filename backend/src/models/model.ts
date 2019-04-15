
export interface Model {

  toDereference(): string[];
  getReference(key: string): string;
  getDereferenceType(key: string): string;
  dereference(key: string, data: Object): void;

}
