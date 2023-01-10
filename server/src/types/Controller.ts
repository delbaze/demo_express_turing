import { Request, Response } from "express";

export interface Controller {
  [k: string]: (req: Request, res: Response) => void;
}
