import serverConstants from "../../../constants/serverConstants";
import * as Status from "http-status-codes";
import { ErrorResponse } from "./error-response";

export function create404(details?: string): ErrorResponse {
  return new ErrorResponse(
    serverConstants.serviceName,
    Status.NOT_FOUND.valueOf(),
    "NotFound",
    details || "Content not found"
  );
}

export function create422(details?: string): ErrorResponse {
  return new ErrorResponse(
    serverConstants.serviceName,
    Status.UNPROCESSABLE_ENTITY.valueOf(),
    "UnprocessableEntity",
    details || "A field in the request was unprocessable"
  );
}
