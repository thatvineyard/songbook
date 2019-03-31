import { ApiBuilder } from "./api-builder";
import { Router, NextFunction, Response, Request } from "express";
import { Method } from "./method";
import { Parameter } from "./parameter";
import * as Status from "http-status-codes";

// Add method validator middleware
export function registerApiValidator(
  apiBuilder: ApiBuilder,
  router: Router
): void {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res = validate(req, res, apiBuilder.methods);
    if (res.statusCode / 100 === 2) {
      next();
    } else {
      res.send();
    }
  });
}

function validate(req: Request, res: Response, methods: Method[]): Response {
  res = validateParameters(req, res, methods);

  return res;
}

function validateParameters(
  req: Request,
  res: Response,
  methods: Method[]
): Response {
  let url = req.path;
  let httpMethod = req.method;

  let missingParams: Parameter[] = [];

  // Find missing parameters
  methods.forEach(method => {
    console.log(method.url + " : " + url);
    if (method.url === url && method.httpMethod === httpMethod) {
      method.parameters.forEach(parameter => {
        if (!validateRequestParameters(req, parameter)) {
          missingParams.push(parameter);
        }
      });
    }
  });

  // Formulate response
  if (missingParams.length != 0) {
    res
      .status(Status.UNPROCESSABLE_ENTITY)
      .contentType("application/json")
      .write(
        JSON.stringify({
          missingParameters: missingParams.map(param => {
            return param.toString();
          })
        })
      );
  }

  return res;
}

function validateRequestParameters(
  req: Request,
  parameter: Parameter
): boolean {
  let result = true;

  if (parameter.required) {
    if (!req[parameter.parameterType.toString()][parameter.name]) {
      result = false;
    }
  } else {
    if (req[parameter.parameterType.toString()][parameter.name]) {
      parameter.dependencies.forEach(dependency => {
        if (validateRequestForceRequired(req, dependency)) {
          result = false;
        }
      });
    }
  }
  return result;
}

function validateRequestParameterForceRequired(
  req: Request,
  parameter: Parameter
): boolean {
  return !(req[parameter.parameterType.toString()][parameter.name] === null);
}
