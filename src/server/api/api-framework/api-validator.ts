import { ApiBuilder } from "./api-builder";
import { Router, NextFunction, Response, Request } from "express";
import { Method } from "./method";
import { Parameter, ParameterType } from "./parameter";
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
    result = requestHasParameter(req, parameter.parameterType, parameter.name);
  } else {
    if (requestHasParameter(req, parameter.parameterType, parameter.name)) {
      parameter.dependencies.forEach(dependency => {
        if (validateRequestParameterForceRequired(req, dependency)) {
          result = false;
        }
      });
    }
  }
  return result;
}

function requestHasParameter(
  req: Request,
  parameterType: ParameterType,
  parameterName: string
): boolean {
  if (parameterType === ParameterType.BODY) {
    if (!req.body[parameterName]) {
      return false;
    }
  } else if (parameterType === ParameterType.QUERY) {
    if (!req.query[parameterName]) {
      return false;
    }
  }
  return true;
}

function validateRequestParameterForceRequired(
  req: Request,
  parameter: Parameter
): boolean {
  return requestHasParameter(req, parameter.parameterType, parameter.name);
}
