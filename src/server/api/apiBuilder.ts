import express, { Request, Response, Router, RequestHandler } from "express";

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
    parameters?: string[]
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

  public buildRouter(): Router {
    let router = express.Router();

    console.debug(this.methods.join("\n"));
    console.dir(this.methods, { depth: null });
    this.methods.forEach(method => {
      this.addMethodToRouter(router, method);
    });

    return router;
  }
}

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

class Method {
  httpMethod: HttpMethod;
  url: string;
  description: string | undefined;
  parameters: Parameter[] | undefined;
  handlers: RequestHandler;

  constructor(
    method: HttpMethod,
    url: string,
    handlers: RequestHandler,
    description?: string,
    parameters?: Parameter[]
  ) {
    this.httpMethod = method;
    this.url = url;
    this.description = description;
    this.parameters = parameters;
    this.handlers = handlers;
  }

  public toString() {
    return this.httpMethod + ": " + this.url;
  }
}

export enum ParameterType {
  QUERY = "QUERY",
  BODY = "BODY"
}

export class Parameter {
  parameterType: ParameterType;
  name: string;
  objectType: string;
  dependencies: string[];

  constructor(type: ParameterType, name: string, objectType: string) {
    this.parameterType = type;
    this.name = name;
    this.objectType = objectType;
    this.dependencies = [];
  }

  public addDependency(dependency: Parameter, value?: string) {
    this.dependencies.push(
      dependency.name + (value != null ? "(" + value + ")" : "")
    );
  }
}
