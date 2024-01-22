import { nanoid } from 'nanoid';
export const genId = () => nanoid(16);
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });

const seedDatabase = async () => {
  await db.submission.createMany({
    data: [
      {
        id: genId(),
        submittedAt: new Date(),
        data: {
          name: 'Kevin Wade',
          twitter: 'kevinwwwade',
        },
      },
    ],
  });
};
seedDatabase();
