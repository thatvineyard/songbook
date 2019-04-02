import express, { Request, RequestHandler, Response, Router } from "express";
import * as Status from "http-status-codes";
import { registerApiInfo } from "./api-info";
import { registerApiValidator } from "./api-validator";
import { HttpMethod, Method } from "./method";
import { Parameter } from "./parameter";
import colors from 'colors';

export class ApiBuilder {
  contextRoot: string;
  methods: Method[];
  apiInfoEnabled: boolean;
  apiInfoUrl: string | undefined;
  validationActive: boolean;

  constructor(contextRoot: string) {
    this.contextRoot = contextRoot;
    this.methods = [];
    this.apiInfoEnabled = false;
    this.apiInfoUrl = undefined;
    this.validationActive = false;
  }

  // SETTINGS
  public enableApiInfo(url: string) {
    this.apiInfoEnabled = true;
    this.apiInfoUrl = url;
  }

  public activateValidation() {
    this.validationActive = true;
  }

  // PLAN

  /**
   * Add an ApiBuilder object as a subapi.
   *
   * It will add all of that builder's methods, but not any of its settings.
   *
   * This will make a copy, not a reference, so make sure the subapi is fully defined before using this function.
   *
   * @param baseUrl The url which the subApi's methods will be organized under.
   * @param newApi The configured ApiBuilder.
   */
  public subApi(baseUrl: string, newApi: ApiBuilder) {
    let newMethods = newApi.methods.slice(0);

    newMethods.forEach(method => {
      method.url = baseUrl + method.url;
      this.addMethod(
        method.httpMethod,
        method.url,
        method.handlers,
        method.description,
        method.parameters
      );
    });
  }

  /**
   * Adds a function at a certain url at the corresponding http method (this one is GET).
   *
   *
   * @param url The url which the method listens to.
   * @param handlers The function which  called by this method.
   * @param description (Optional) A description of the method.
   * @param parameters (Optional) Any parameters that the method expects.
   */
  public addGet(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.GET, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addPost(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.POST, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addPut(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.PUT, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addOptions(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.OPTIONS, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addHead(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.HEAD, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addConnect(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.CONNECT, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addPatch(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.PATCH, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addDelete(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.DELETE, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  public addTrace(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.TRACE, url, handlers, description, parameters);
  }

  /**
   * See @function addGet.
   */
  private addMethod(
    httpMethod: HttpMethod,
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.methods.push(
      new Method(
        httpMethod,
        this.contextRoot + url,
        handlers,
        description,
        parameters
      )
    );
  }

  // BUILD METHODS
  public buildRouter(apiBuilder: ApiBuilder): Router {
    if (this.apiInfoEnabled && typeof this.apiInfoUrl === "string") {
      registerApiInfo(apiBuilder, this.apiInfoUrl);
    }

    let router: Router = express.Router();

    if (this.validationActive) {
      registerApiValidator(apiBuilder, router);
    }

    apiBuilder.configureRouter(router);
    return router;
  }

  private addMethodToRouter(router: Router, method: Method) {
    switch (method.httpMethod) {
      case HttpMethod.GET:
        router.get(method.url, method.handlers);
        break;
      case HttpMethod.PUT:
        router.put(method.url, method.handlers);
        break;
      case HttpMethod.POST:
        router.post(method.url, method.handlers);
        break;
      case HttpMethod.DELETE:
        router.delete(method.url, method.handlers);
        break;
      case HttpMethod.CONNECT:
        router.connect(method.url, method.handlers);
        break;
      case HttpMethod.HEAD:
        router.head(method.url, method.handlers);
        break;
      case HttpMethod.OPTIONS:
        router.options(method.url, method.handlers);
        break;
      case HttpMethod.TRACE:
        router.trace(method.url, method.handlers);
        break;
      case HttpMethod.PATCH:
        router.patch(method.url, method.handlers);
        break;
      default:
        break;
    }
  }

  private configureRouter(router: Router): void {
    console.debug(colors.cyan("# API Configuration:"));
    console.table(this.methods.map(method => method.toString().split(/: | - /)));
    console.debug();
    // console.dir(this.methods, { depth: null });
    this.methods.forEach(method => {
      this.addMethodToRouter(router, method);
    });
  }
}
