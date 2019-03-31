import { Server } from "./server/server";
import { DatabaseHandler } from "./database/database";

let db = DatabaseHandler.Instance;

let server = new Server();
server.start();
