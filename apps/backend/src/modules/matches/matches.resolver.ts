import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GamesService } from 'src/modules/games/games.service';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchesService } from 'src/modules/matches/matches.service';
import { EloInfo } from 'src/modules/matches/models/EloInfo.model';
import { Match } from 'src/modules/matches/models/Match.model';

import { MatchResultsService } from '../match-results/match-results.service';
import { MatchResult } from '../match-results/models/MatchResults.model';
import { MatchCreateInput } from './models/MatchCreateInput.model';

@Resolver(() => Match)
export class MatchesResolver {
  constructor(
    private matchesService: MatchesService,
    private gamesService: GamesService,
    private matchResultsService: MatchResultsService,
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

  @ResolveField('matchResults')
  async matchResults(@Parent() { id }: Match): Promise<MatchResult[]> {
    return this.matchResultsService.findManyByMatchId(id);
  }

  @ResolveField('eloInfo')
  async eloInfo(@Parent() { id }: Match): Promise<EloInfo[]> {
    return this.matchesService.getEloInfo(id);
  }
}
