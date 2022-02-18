import { PrismaClient } from '@prisma/client';

import { seedDb } from '../seeder';

/* eslint-disable no-console */
const prisma = new PrismaClient();

seedDb(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Finished seeding DB');
    await prisma.$disconnect();
    process.exit(0);
  });
