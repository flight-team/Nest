import { Response } from 'express';
export declare class AppController {
    redirectSwagger(res: Response): void;
    healthCheck(): {
        status: string;
    };
}
