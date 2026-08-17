import prisma from "../lib/db.js";

export function createMagicLink(token: string, expiryAt: Date) {
    return prisma.magicLink.create({
        data: {
            token,
            expiryAt,
        },
    });
}

export function deleteMagicLink(id: string) {
    return prisma.magicLink.delete({
        where: {
            id,
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

export function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}
