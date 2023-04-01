declare class EnvironmentVariables {
    PORT: number;
    DATABASE_URL: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
