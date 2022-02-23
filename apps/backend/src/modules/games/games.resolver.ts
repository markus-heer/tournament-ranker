import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GamesService } from 'src/modules/games/games.service';
import { Game } from 'src/modules/games/models/Game.model';
import { MatchesService } from 'src/modules/matches/matches.service';

import { GameCreateInput } from './models/GameCreateInput.model';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private gamesService: GamesService, private matchesService: MatchesService) {}

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

  @ResolveField('numberOfMatches')
  async numberOfMatches(@Parent() { id }: Game): Promise<number> {
    return this.matchesService.getNumberOfMatchesByGameId(id);
  }
}
