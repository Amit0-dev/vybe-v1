import prisma from "../lib/db";

interface SpaceCreateInput {
    name: string;
    description: string | null;
    code: string;
    userId: string;
}

interface SpaceUpdateInput {
    name?: string;
    description?: string | null;
    code?: string;
}

export function createSpace(input: SpaceCreateInput) {
    return prisma.space.create({
        data: {
            name: input.name,
            desc: input.description,
            code: input.code,
            ownerId: input.userId,
        },
    });
}

export function updateSpace(id: string, input: SpaceUpdateInput) {
    return prisma.space.update({
        where: {
            id: id,
        },
        data: {
            ...input,
        },
    });
}

export function findSpaceById(id: string) {
    return prisma.space.findUnique({
        where: {
            id: id,
        },
    });
}

export function findSpacesByUserId(userId: string) {
    return prisma.space.findMany({
        where: {
            ownerId: userId,
        },
    });
}

export function deleteSpace(id: string) {
    return prisma.space.delete({
        where: {
            id: id,
        },
    });
}

export function getAllSpaces() {
    return prisma.space.findMany();
}
