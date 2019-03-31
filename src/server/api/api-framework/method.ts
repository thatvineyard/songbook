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
  description: string;
  parameters: Parameter[];
  handlers: RequestHandler;
  permission: string;

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
    this.description = description || "";
    this.parameters = parameters || [];
    this.handlers = handlers;
    this.permission = permission || "public";
  }

  public toString() {
    return this.httpMethod + ": " + this.url;
  }
}
