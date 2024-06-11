import express, { Express, Request, Response } from 'express';
import cors from 'cors';

export default class Application
{
    private baseRoute: string = '/api';
    private express: Express;
    private readonly port: number;
    private readonly apiRouter: any;

    constructor(options: IApplicationOptions = {port: 3001})
    {
        this.express = express();
        this.port = options.port;

        this.apiRouter = express.Router();
        this.apiRouter.use((req: Request, res: Response, next: any) => {
            console.log(`API Request received: ${req.path}`)
            res.setHeader('Content-Type', 'application/json');
            next();
        });
        this.express.use(cors());
        this.express.use(this.baseRoute, this.apiRouter);

        this.apiRouter.get('/', (req: Request, res: Response): void => {
            res.json({
                requestPath: req.path,
                message: 'Success',
            });
        });

        this.express.listen(this.port, () => {
            console.log(`API Server running at http://localhost:${this.port}`);
        });
    }
}

interface IApplicationOptions
{
    port: number;
}