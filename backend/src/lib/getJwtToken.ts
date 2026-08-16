import jwt from "jsonwebtoken";

type JwtPayload = { email: string } | { id: string };

export function getJwtToken(data: JwtPayload, secret: string, expiresIn: number): string {
    return jwt.sign(
        {
            ...data,
        },
        secret,
        {
            expiresIn,
        },
    );
}
