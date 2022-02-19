import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Player } from '../players/models/Player.model';
import { PlayersService } from '../players/players.service';
import { MatchResultsService } from './match-results.service';
import { MatchResult } from './models/MatchResults.model';

@Resolver(() => MatchResult)
export class MatchResultsResolver {
  constructor(
    private matchResultsService: MatchResultsService,
    private playerService: PlayersService,
  ) {}

  @Query(() => [MatchResult])
  async matchResults(): Promise<MatchResult[]> {
    return this.matchResultsService.findAll();
  }

  @ResolveField('player')
  async player(@Parent() { id }: MatchResult): Promise<Player> {
    return this.playerService.findByMatchResultId(id);
  }
}
