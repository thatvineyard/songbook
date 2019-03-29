import express, {
  Request,
  Response,
  Router,
  RequestHandler,
  NextFunction
} from "express";
import * as Status from "http-status-codes";
import { RSA_NO_PADDING } from "constants";

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
        console.log("MATCH");
        method.parameters.forEach(parameter => {
          console.log(parameter);
          if (!parameter.validateRequest(req)) {
            missingParams.push(parameter);
          }
        });
      }
    });

    console.log(missingParams);

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

  public buildRouter(): Router {
    let router = express.Router();

    this.configureRouter(router);

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
  description: string;
  parameters: Parameter[];
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
    this.description = description || "";
    this.parameters = parameters || [];
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
  required: boolean;
  dependencies: Parameter[];

  constructor(
    type: ParameterType,
    name: string,
    objectType: string,
    required?: boolean
  ) {
    this.parameterType = type;
    this.name = name;
    this.objectType = objectType;
    this.required = required || false;
    this.dependencies = [];
  }

  public addDependency(dependency: Parameter, value?: string) {
    this.dependencies.push(dependency);
  }

  public validateRequest(req: Request): boolean {
    let result = true;

    if (this.required) {
      if (!req.body[this.name]) {
        result = false;
      }
    } else {
      if (req.body[name]) {
        this.dependencies.forEach(dependency => {
          if (!dependency.validateRequestForceRequired(req)) {
            result = false;
          }
        });
      }
    }
    return result;
  }

  public validateRequestForceRequired(req: Request): boolean {
    return !(req.body[name] === null);
  }

  public toString(): string {
    return (
      "(" +
      this.parameterType.toString() +
      ") - " +
      this.name +
      " (" +
      this.objectType +
      ")"
    );
  }
}
