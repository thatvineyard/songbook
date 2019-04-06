import { Server } from "./server/server";
import { DatabaseHandler } from "./database/database-handler";

let db = DatabaseHandler.Instance;

let server = new Server();
server.start();
