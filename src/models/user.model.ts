import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(user: Partial<User>): Promise<User> {
  return await prisma.user.create({data: user as any});
}

export async function getUserById(uuid: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { uuid } });
}

export async function verifyLogin(emailHash: string, passwordHash: string): Promise<User | null> {
  return await prisma.user.findFirst({ where: { emailHash, passwordHash } })
}