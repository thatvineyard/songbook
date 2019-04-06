import serverConstants from "../../../constants/serverConstants";
import * as Status from "http-status-codes";
import { ErrorResponse, ErrorType } from "./error-response";

export function create404(details?: string): ErrorResponse {
  return new ErrorResponse(
    serverConstants.serviceName,
    ErrorType.INTERNAL,
    Status.NOT_FOUND.valueOf(),
    "NotFound",
    details || "Content not found"
  );
}

export function create422(details?: string): ErrorResponse {
  return new ErrorResponse(
    serverConstants.serviceName,
    ErrorType.INTERNAL,
    Status.UNPROCESSABLE_ENTITY.valueOf(),
    "UnprocessableEntity",
    details || "A field in the request was unprocessable"
  );
}

export function create500(details?: string): ErrorResponse {
  return new ErrorResponse(
    serverConstants.serviceName,
    ErrorType.INTERNAL,
    Status.INTERNAL_SERVER_ERROR.valueOf(),
    "InternalServerError",
    details || "An internal server error occured"
  );
}
