import { Request } from "express";

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
      if (req.body[this.name]) {
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
    return !(req.body[this.name] === null);
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

export enum ParameterType {
  QUERY = "QUERY",
  BODY = "BODY"
}
