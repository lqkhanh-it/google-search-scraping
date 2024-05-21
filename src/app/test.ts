import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example usage

async function createUser() {
  const user = await prisma.user.create({
    data: {
      status: UserStatus.ACTIVE,
      // ... other user data
    },
  });
  console.log(`Created user with ID: ${user.id}`);
}

async function createKeyword() {
  const keyword = await prisma.keyword.create({
    data: {
      key: 'your_keyword',
      htmlUrl: 'https://...',
      // ... other keyword data
    },
  });
  console.log(`Created keyword with ID: ${keyword.id}`);
}

async function createUserSearch(userId, keywordId) {
  await prisma.userSearch.create({
    data: {
      userId,
      keywordId,
    },
  });
  console.log('Created user search relationship');
}

(async () => {
  await createUser();
  await createKeyword();
  await createUserSearch('user-id', 'keyword-id');
})();
