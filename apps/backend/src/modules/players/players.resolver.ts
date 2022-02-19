import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MatchResultsService } from 'src/modules/match-results/match-results.service';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayersService } from 'src/modules/players/players.service';

import { PlayerCreateInput } from './models/PlayerCreateInput.model';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(
    private playersService: PlayersService,
    private matchResultsService: MatchResultsService,
  ) {}

  @Query(() => [Player])
  async players(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Mutation(() => Player)
  async createPlayer(@Args('data') data: PlayerCreateInput): Promise<Player> {
    return this.playersService.create(data);
  }

  @Mutation(() => Player)
  async deletePlayer(@Args({ name: 'id', type: () => ID }) id: string): Promise<Player> {
    return this.playersService.delete(id);
  }

  @ResolveField('elo')
  async elo(@Parent() { id }: Player): Promise<number> {
    return this.matchResultsService.calculateEloByPlayerId(id);
  }
}
