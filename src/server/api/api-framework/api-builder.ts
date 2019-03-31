import express, { Request, RequestHandler, Response, Router } from "express";
import * as Status from "http-status-codes";
import { registerApiInfo } from "./api-info";
import { registerApiValidator } from "./api-validator";
import { HttpMethod, Method } from "./method";
import { Parameter } from "./parameter";

export class ApiBuilder {
  contextRoot: string;
  methods: Method[];
  apiInfoEnabled: boolean;

  constructor(contextRoot: string) {
    this.contextRoot = contextRoot;
    this.methods = [];
    this.apiInfoEnabled = true;
  }

  addMethod(
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

  addGet(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.GET, url, handlers, description, parameters);
  }

  addPost(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.POST, url, handlers, description, parameters);
  }

  addPut(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.PUT, url, handlers, description, parameters);
  }

  addOptions(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.OPTIONS, url, handlers, description, parameters);
  }

  addHead(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.HEAD, url, handlers, description, parameters);
  }

  addConnect(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.CONNECT, url, handlers, description, parameters);
  }

  addPatch(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.PATCH, url, handlers, description, parameters);
  }

  addDelete(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.DELETE, url, handlers, description, parameters);
  }

  addTrace(
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.addMethod(HttpMethod.TRACE, url, handlers, description, parameters);
  }

  addMethodToRouter(router: Router, method: Method) {
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

  subApi(baseUrl: string, newApi: ApiBuilder) {
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

  private validateParameters(
    req: Request,
    res: Response,
    methods: Method[]
  ): Response {
    let url = req.url;
    let httpMethod = req.method;

    let missingParams: Parameter[] = [];
    this.methods.forEach(method => {
      if (method.url === url && method.httpMethod === httpMethod) {
        method.parameters.forEach(parameter => {
          if (!parameter.validateRequest(req)) {
            missingParams.push(parameter);
          }
        });
      }
    });

    if (missingParams.length != 0) {
      res.status(Status.UNPROCESSABLE_ENTITY).write(
        JSON.stringify({
          missing: missingParams.map(param => {
            return param.toString();
          })
        })
      );
    }

    return res;
  }

  public validate(req: Request, res: Response, methods: Method[]): Response {
    res = this.validateParameters(req, res, methods);

    return res;
  }

  public configureRouter(router: Router): void {
    console.debug(this.methods.join("\n"));
    console.dir(this.methods, { depth: null });
    this.methods.forEach(method => {
      this.addMethodToRouter(router, method);
    });
  }

  public buildRouter(apiBuilder: ApiBuilder): Router {
    registerApiInfo(apiBuilder);

    let router: Router = express.Router();

    registerApiValidator(apiBuilder, router);

    apiBuilder.configureRouter(router);
    return router;
  }
}
