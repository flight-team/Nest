export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
    isEnv(env: string): boolean;
    get nodeEnv(): string;
}
