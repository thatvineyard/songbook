import { Model } from 'models/model';
import { Entry } from './entry';

export interface DatabaseAccessor<T extends Model> {

  get(id: string): Entry<T> | null;
}
