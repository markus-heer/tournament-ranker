-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "elo" INTEGER NOT NULL DEFAULT 1200,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
