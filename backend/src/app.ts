import { Server } from './server/server';
import { DatabaseManager } from './database/database-manager';
import { populate } from './database/populate';

const db = DatabaseManager.Instance;
populate(db, 2, 0, 0);

const server = new Server();
server.start();
