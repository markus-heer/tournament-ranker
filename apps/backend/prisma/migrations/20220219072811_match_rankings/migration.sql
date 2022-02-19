/*
  Warnings:

  - You are about to drop the column `elo` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `PlayersOnMatches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WinnersOnMatches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayersOnMatches" DROP CONSTRAINT "PlayersOnMatches_matchId_fkey";

-- DropForeignKey
ALTER TABLE "PlayersOnMatches" DROP CONSTRAINT "PlayersOnMatches_playerId_fkey";

-- DropForeignKey
ALTER TABLE "WinnersOnMatches" DROP CONSTRAINT "WinnersOnMatches_matchId_fkey";

-- DropForeignKey
ALTER TABLE "WinnersOnMatches" DROP CONSTRAINT "WinnersOnMatches_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "elo",
ADD COLUMN     "startingElo" INTEGER NOT NULL DEFAULT 1200;

-- DropTable
DROP TABLE "PlayersOnMatches";

-- DropTable
DROP TABLE "WinnersOnMatches";

-- CreateTable
CREATE TABLE "MatchRanking" (
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "eloChange" INTEGER NOT NULL,

    CONSTRAINT "MatchRanking_pkey" PRIMARY KEY ("playerId","matchId")
);

-- AddForeignKey
ALTER TABLE "MatchRanking" ADD CONSTRAINT "MatchRanking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchRanking" ADD CONSTRAINT "MatchRanking_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
