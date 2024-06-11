import { Request, Response } from 'express';

export default interface IAPIRouteDefinition
{
    path: string;
    callback: (req: Request, res: Response) => void;
}