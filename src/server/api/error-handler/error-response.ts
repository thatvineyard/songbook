import { Response } from "express";

export class ErrorResponse {
  service: string;
  httpStatus: number;
  errorCode: string;
  details: string;
  cause: ErrorResponse | undefined;

  constructor(
    service: string,
    httpStatus: number,
    errorCode: string,
    details: string,
    cause?: ErrorResponse
  ) {
    this.service = service;
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.details = details;
    this.cause = cause;
  }

  public sendResponse(res: Response) {
    res
      .status(this.httpStatus)
      .contentType("application/json")
      .send(this);
  }

  public getRootCause(): ErrorResponse {
    if (this.cause === undefined) {
      return this;
    } else {
      return this.cause.getRootCause();
    }
  }

  public toString(): string {
    return (
      "[" +
      this.service +
      "] " +
      this.errorCode +
      " (" +
      this.httpStatus +
      "): " +
      this.details +
      (this.cause !== undefined ? " was caused by other error." : "")
    );
  }

  public toLog(): string {
    return (
      toString() + "\n" + (this.cause !== undefined ? this.cause.toLog() : "")
    );
  }
}
