import prisma from "../lib/db";

export function createMagicLink(token: string, expiryAt: Date) {
    return prisma.magicLink.create({
        data: {
            token,
            expiryAt,
        },
    });
}

export function getRecordByToken(token: string) {
    return prisma.magicLink.findFirst({
        where: { token },
    });
}

export function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export function createUser(email: string, isVerified: boolean) {
    return prisma.user.create({
        data: { email, isEmailVerified: isVerified },
    });
}
