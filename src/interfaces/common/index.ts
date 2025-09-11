import { Request, Response } from "express"

export interface MyContext {
    req: Request
    res: Response
    user?: any
  }

  
export enum TrainingMode {
  ONLINE = 'Online',
  LAHORE_CAMPUS = 'Lahore Campus',
  ISLAMABAD_CAMPUS = 'Islamabad Campus',
}
