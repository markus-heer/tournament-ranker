-- CreateTable
CREATE TABLE "WinnersOnMatches" (
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "WinnersOnMatches_pkey" PRIMARY KEY ("playerId","matchId")
);

-- AddForeignKey
ALTER TABLE "WinnersOnMatches" ADD CONSTRAINT "WinnersOnMatches_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WinnersOnMatches" ADD CONSTRAINT "WinnersOnMatches_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
