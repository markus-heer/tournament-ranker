import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GamesService } from 'src/modules/games/games.service';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchesService } from 'src/modules/matches/matches.service';
import { Match } from 'src/modules/matches/models/Match.model';

import { MatchRankingsService } from '../match-rankings/match-rankings.service';
import { MatchRanking } from '../match-rankings/models/MatchRankings.model';
import { MatchCreateInput } from './models/MatchCreateInput.model';

@Resolver(() => Match)
export class MatchesResolver {
  constructor(
    private matchesService: MatchesService,
    private gamesService: GamesService,
    private matchRankingsService: MatchRankingsService,
  ) {}

  @Query(() => [Match])
  async matches(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Mutation(() => Match)
  async createMatch(@Args('data') data: MatchCreateInput): Promise<Match> {
    return this.matchesService.create(data);
  }

  @Mutation(() => Match)
  async deleteMatch(@Args({ name: 'id', type: () => ID }) id: string): Promise<Match> {
    return this.matchesService.delete(id);
  }

  @ResolveField('game')
  async game(@Parent() { id }: Match): Promise<Game> {
    return this.gamesService.findByMatchId(id);
  }

  @ResolveField('matchRankings')
  async matchRankings(@Parent() { id }: Match): Promise<MatchRanking[]> {
    return this.matchRankingsService.findManyByMatchId(id);
  }
}
