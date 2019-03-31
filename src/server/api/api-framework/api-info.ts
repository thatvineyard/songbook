import serverConstants from "../../../constants/serverConstants";
import { ApiBuilder } from "./api-builder";
import { Parameter, ParameterType } from "./parameter";

export let getApiParams: Parameter[] = [
  new Parameter(ParameterType.BODY, "url", "string"),
  new Parameter(ParameterType.BODY, "httpMethod", "enum (BODY, GET)"),
  new Parameter(ParameterType.BODY, "permission", "string"),
  new Parameter(
    ParameterType.BODY,
    "options",
    "list of enum (brief, noParameters)"
  )
];

export function registerApiInfo(apiBuilder: ApiBuilder): void {
  apiBuilder.addGet(
    serverConstants.apiInfoUrl,
    function getApiInfoWrapper(req: Request, res: Response) {
      getApiInfo(req, res, apiBuilder.methods);
    },
    "Get API info",
    getApiParams
  );
}

export function getApiInfo(req: Request, res: Response, methods: Method[]) {
  let result: Method[] = methods.slice(0);

  // Filter URLs
  if (req.body.url) {
    let url = req.body.url;
    result = result.filter(function(method: Method) {
      // TODO: Rewrite this with split on urls so that it forces a match on each subpath
      // eg: /ap should not match with /api
      return method.url.startsWith(url);
    });
  }

  // Filter http methods
  if (req.body.httpMethod) {
    let httpMethod = req.body.httpMethod;
    result = result.filter(function(method: Method) {
      return method.httpMethod === httpMethod;
    });
  }

  // Filter permission
  if (req.body.permission) {
    let permission = req.body.permission;
    result = result.filter(function(method: Method) {
      return method.permission === permission;
    });
  }

  // Options
  if (req.body.options && Array.isArray(req.body.options)) {
    let options: string = req.body.options;

    options.forEach((option: string) => {
      switch (option) {
        case "brief":
          result = result.map((method: Method) => {
            return method.toString();
          });
          break;
        case "noParameters":
          result = result.map((method: Method) => {
            if (method.parameters) {
              method.parameters = [];
              return method;
            }
          });

          break;
      }
    });
  }

  res.send(result);
}
