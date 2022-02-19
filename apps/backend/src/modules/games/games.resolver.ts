import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GamesService } from 'src/modules/games/games.service';
import { Game } from 'src/modules/games/models/Game.model';

import { GameCreateInput } from './models/GameCreateInput.model';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private gamesService: GamesService) {}

  @Query(() => [Game])
  async games(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Mutation(() => Game)
  async createGame(@Args('data') data: GameCreateInput): Promise<Game> {
    return this.gamesService.create(data);
  }

  @Mutation(() => Game)
  async deleteGame(@Args({ name: 'id', type: () => ID }) id: string): Promise<Game> {
    return this.gamesService.delete(id);
  }
}
