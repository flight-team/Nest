import { Response } from 'express';
export declare class AppController {
    constructor();
    redirectSwagger(res: Response): void;
    healthCheck(): {
        status: string;
    };
}
