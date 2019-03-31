import express, { Express } from "express";
import { createApi } from "./api/api";

import serverConstants from "../constants/serverConstants";
import bodyParser = require("body-parser");

// App
export class Server {
  express: Express;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use("/", createApi());
  }

  start() {
    this.express.listen(serverConstants.port);
    console.log("# Server startup");
    console.log(
      `Running on http://${serverConstants.host}:${serverConstants.port}`
    );
  }
}
