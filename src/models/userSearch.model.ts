import { PrismaClient, UserSearch } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserSearch(userSearch: UserSearch): Promise<UserSearch> {
  return await prisma.userSearch.create({data: userSearch});
}

export async function getUserSearchById(id: number): Promise<UserSearch | null> {
  return await prisma.userSearch.findUnique({ where: { id } });
}
