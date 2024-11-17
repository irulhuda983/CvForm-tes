import { Request } from "express";

export interface IRequestData extends Request {
  file: any;
}
