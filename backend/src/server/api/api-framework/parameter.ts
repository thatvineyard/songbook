import { Request } from "express";

export class Parameter {
  parameterType: ParameterType;
  name: string;
  objectType: string;
  description: string;
  required: boolean;
  dependencies: Parameter[];

  constructor(
    type: ParameterType,
    name: string,
    objectType: string,
    description?: string,
    required?: boolean
  ) {
    this.parameterType = type;
    this.name = name;
    this.objectType = objectType;
    this.description = description || "No description";
    this.required = required || false;
    this.dependencies = [];
  }

  public addDependency(dependency: Parameter, value?: string) {
    this.dependencies.push(dependency);
  }

  public toString(): string {
    return (
      this.name +
      " (" +
      this.objectType +
      ") in " +
      this.parameterType.toString()
    );
  }
}

export enum ParameterType {
  QUERY = "query",
  BODY = "body",
  URL = "url"
}
