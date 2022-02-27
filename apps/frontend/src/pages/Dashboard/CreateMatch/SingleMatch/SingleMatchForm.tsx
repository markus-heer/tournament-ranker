import { useApolloClient } from '@apollo/client';
import { Button, Stack } from '@mui/material';
import { useCallback, useEffect, useState, VFC } from 'react';

import { GqlFullPlayerFragment } from '../../../../graphql/fragments/__generated__/fullPlayer';
import { useCreateSingleMatchMutation } from '../../../../graphql/mutations/__generated__/createSingleMatch';
import { GqlGamesQuery } from '../../../../graphql/queries/__generated__/games';
import { GqlPlayersQuery } from '../../../../graphql/queries/__generated__/players';
import { GqlMatchCreateSingleInput } from '../../../../graphql/types';
import { sortByName } from '../../../../helpers/sortByName';
import { SingleRank } from './SingleRank';

interface SingleMatchFormProps {
  gamesData: GqlGamesQuery;
  playersData: GqlPlayersQuery;
  gameId: string;
  setGameId: (gameId: string) => void;
}

export const SingleMatchForm: VFC<SingleMatchFormProps> = ({
  gamesData,
  playersData,
  gameId,
  setGameId,
}) => {
  const [playerRanks, setPlayerRanks] = useState<Record<string, number>>({});

  const [createMatchMutation] = useCreateSingleMatchMutation();
  const apolloClient = useApolloClient();

  const setInitialData = useCallback(() => {
    if (gamesData && playersData) {
      const initialPlayerRanks: Record<string, number> = {};
      playersData.players.forEach(({ id }) => {
        initialPlayerRanks[id] = 0;
      });
      setPlayerRanks(initialPlayerRanks);
    }
  }, [gamesData, playersData]);

  useEffect(() => {
    setInitialData();
  }, [gamesData, playersData, setInitialData]);

  const getHighestRank = () => {
    let highestRank = 0;
    Object.keys(playerRanks).forEach((playerId) => {
      if (playerRanks[playerId] > highestRank) {
        highestRank = playerRanks[playerId];
      }
    });
    return highestRank;
  };

  const onDrop = (rank: number) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => {
    setPlayerRanks({ ...playerRanks, [player.id]: rank });
  };

  const getPlayerObjectsFromRank = (rank: number) => {
    const playerIds = Object.keys(playerRanks);

    let players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[] = [];

    playerIds.forEach((playerId) => {
      if (playerRanks[playerId] === rank) {
        const player = playersData?.players.find(({ id }) => playerId === id);

        if (player) {
          players = [...players, { id: playerId, name: player.name }];
        } else {
          throw new Error('Player not found');
        }
      }
    });

    return players.sort(sortByName);
  };

  const createMatch = async () => {
    const playerIds = Object.keys(playerRanks);

    let playerRankArray: { playerId: string; rank: number }[] = [];

    playerIds.forEach((playerId) => {
      if (playerRanks[playerId] !== 0) {
        const player = playersData?.players.find(({ id }) => playerId === id);

        if (player) {
          playerRankArray = [...playerRankArray, { playerId, rank: playerRanks[playerId] }];
        } else {
          throw new Error('Player not found');
        }
      }
    });

    const matchCreateInput: GqlMatchCreateSingleInput = {
      gameId,
      playerRankings: playerRankArray,
    };

    await createMatchMutation({ variables: { data: matchCreateInput } });

    setInitialData();

    setGameId(gamesData?.games[0]?.id || '');

    await apolloClient.refetchQueries({
      include: 'active',
    });
  };

  return (
    <>
      <Stack spacing={2} sx={{ marginTop: 5 }}>
        {Array.from(Array(getHighestRank() + 2).keys()).map((rank) => (
          <SingleRank
            key={rank}
            rank={rank}
            onDrop={onDrop(rank)}
            players={getPlayerObjectsFromRank(rank)}
          />
        ))}
      </Stack>

      <Button onClick={createMatch} sx={{ marginTop: 5 }}>
        Match erstellen
      </Button>
    </>
  );
};
