import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Player } from '../players/models/Player.model';
import { PlayersService } from '../players/players.service';
import { MatchRankingsService } from './match-rankings.service';
import { MatchRanking } from './models/MatchRankings.model';

@Resolver(() => MatchRanking)
export class MatchRankingsResolver {
  constructor(
    private matchRankingsService: MatchRankingsService,
    private playerService: PlayersService,
  ) {}

  @Query(() => [MatchRanking])
  async matchRankings(): Promise<MatchRanking[]> {
    return this.matchRankingsService.findAll();
  }

  @ResolveField('player')
  async player(@Parent() { id }: MatchRanking): Promise<Player> {
    return this.playerService.findByMatchRankingId(id);
  }
}
