import { Keyword, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createKeyword(key: Keyword): Promise<Keyword> {
  return await prisma.keyword.create({ data: key });
}

export async function getKeyById(id: number): Promise<Keyword | null> {
  return await prisma.keyword.findUnique({ where: { id } });
}
