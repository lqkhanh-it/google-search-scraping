import { PrismaClient, User } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export async function createUser(user: Partial<User>): Promise<User> {
  return await prisma.user.create({ data: user as any });
}

export async function getUserById(uuid: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { uuid } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}

export async function verifyLogin(
  email: string,
  password: string
): Promise<User | null> {
  console.log(email, password);
  const user = await prisma.user.findUnique({ where: { email } });
  const isVerify = await compare(password, user?.passwordHash as any);

  
  if (!isVerify) {
    return null;
  }
  return await prisma.user.update({
    where: { email },
    data: { lastLogin: new Date() },
  });
}
