import type { User } from "./src/middleware/auth.middleware";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}
