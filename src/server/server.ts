import express, { Express } from "express";
import { createApi } from "./api/api";

import serverConstants from "../constants/serverConstants";
import { start } from "repl";

// App
export class Server {
  express: Express;

  constructor() {
    this.express = express();
    this.express.use("/", createApi());
  }

  start() {
    this.express.listen(serverConstants.port);
    console.log(
      `Running on http://${serverConstants.host}:${serverConstants.port}`
    );
  }
}
