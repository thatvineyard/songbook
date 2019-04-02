import { Parameter } from "./parameter";
import { RequestHandler } from "express";

export enum HttpMethod {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PATCH = "PATCH"
}

export class Method {
  httpMethod: HttpMethod;
  url: string;
  permission: string;
  description: string;
  parameters: Parameter[];
  handlers: RequestHandler;

  constructor(
    method: HttpMethod,
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[],
    permission?: string
  ) {
    this.httpMethod = method;
    this.url = url;
    this.permission = permission || "public";
    this.description = description || "";
    this.parameters = parameters || [];
    this.handlers = handlers;
  }

  public toString() {
    return this.httpMethod + ": " + this.url + " - " + this.description;
  }
}
