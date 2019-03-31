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
  let url = req.url;
  let httpMethod = req.method;

  let missingParams: Parameter[] = [];
  methods.forEach(method => {
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
