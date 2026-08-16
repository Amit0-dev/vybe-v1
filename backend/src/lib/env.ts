import "dotenv/config";

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    DATABASE_URL: getEnv("DATABASE_URL"),
    RESEND_API_KEY: getEnv("RESEND_API_KEY"),
    PORT: getEnv("PORT") ?? 8080,
    CLIENT_URL: getEnv("CLIENT_URL"),
    JWT_MAGIC_LINK_SECRET: getEnv("JWT_MAGIC_LINK_SECRET"),
    JWT_SECRET: getEnv("JWT_SECRET"),
};
