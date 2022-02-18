import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from 'src/modules/players/models/Player.model';
import { PlayersService } from 'src/modules/players/players.service';

import { PlayerCreateInput } from './models/PlayerCreateInput.model';
import { PlayerUpdateInput } from './models/PlayerUpdateInput.model';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private playersService: PlayersService) {}

  @Query(() => [Player])
  async players(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Mutation(() => Player)
  async createPlayer(@Args('data') data: PlayerCreateInput): Promise<Player> {
    return this.playersService.create(data);
  }

  @Mutation(() => Player)
  async updatePlayer(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('data') data: PlayerUpdateInput,
  ): Promise<Player> {
    return this.playersService.update(id, data);
  }

  @Mutation(() => Player)
  async deletePlayer(@Args({ name: 'id', type: () => ID }) id: string): Promise<Player> {
    return this.playersService.delete(id);
  }
}
