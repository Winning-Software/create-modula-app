import { Application } from '@dannyxcii/modula/dist/src/api';
import { Request, Response } from 'express';

const api: Application = new Application({
    port: 3001,
    logRequests: true,
});

api.router().get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to your Modula API',
    });
});