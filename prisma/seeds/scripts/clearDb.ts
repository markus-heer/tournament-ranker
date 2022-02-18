/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

import { clearDb } from '../seeder';

const prisma = new PrismaClient();

clearDb(prisma)
  .catch(console.error)
  .finally(async () => {
    console.log('Database cleared');
    await prisma.$disconnect();
  });
