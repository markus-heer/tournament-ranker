import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState, VFC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { useCreateMatchMutation } from '../../../graphql/mutations/__generated__/createMatch';
import { useGamesQuery } from '../../../graphql/queries/__generated__/games';
import { usePlayersQuery } from '../../../graphql/queries/__generated__/players';
import { GqlMatchCreateInput } from '../../../graphql/types';
import { sortByName } from '../../../helpers/sortByName';
import { Team } from './Team';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateMatch: VFC = () => {
  const { data: playersData, loading: playersLoading } = usePlayersQuery();
  const { data: gamesData, loading: gamesLoading } = useGamesQuery();
  const [createMatchMutation] = useCreateMatchMutation();
  const apolloClient = useApolloClient();

  const [playerRanks, setPlayerRanks] = useState<Record<string, number>>({});
  const [game, setGame] = useState<string>('');

  const loading = playersLoading || gamesLoading;

  const setInitialData = useCallback(() => {
    if (gamesData && playersData) {
      const initialPlayerRanks: Record<string, number> = {};
      playersData.players.forEach(({ id }) => {
        initialPlayerRanks[id] = 0;
      });
      setPlayerRanks(initialPlayerRanks);

      setGame(gamesData?.games[0]?.id || '');
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

    const matchCreateInput: GqlMatchCreateInput = {
      gameId: game || '',
      playerRankings: playerRankArray,
    };

    await createMatchMutation({ variables: { data: matchCreateInput } });

    setInitialData();

    await apolloClient.refetchQueries({
      include: 'active',
    });
  };

  if (loading || !gamesData || !playersData) return <div>Loading...</div>;

  const gamesAndPlayersValid = gamesData.games.length !== 0 && playersData.players.length >= 2;

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 1,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <FormWrapper>
        <Typography variant="h4" mb={2}>
          Match erstellen
        </Typography>
        {gamesAndPlayersValid ? (
          <>
            <InputLabel id="game-label">Spiel</InputLabel>
            <Select
              labelId="game-label"
              value={game}
              label="Spiel"
              onChange={(e) => setGame(e.target.value)}
            >
              {gamesData?.games.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <DndProvider backend={HTML5Backend}>
              <Stack spacing={2} sx={{ marginTop: 5 }}>
                {Array.from(Array(getHighestRank() + 2).keys()).map((rank) => (
                  <Team
                    key={rank}
                    rank={rank}
                    onDrop={onDrop(rank)}
                    players={getPlayerObjectsFromRank(rank)}
                  />
                ))}
              </Stack>
            </DndProvider>
          </>
        ) : (
          <Typography variant="h6" mb={2}>
            Bitte erst ein Spiel und mindestens 2 Spieler anlegen
          </Typography>
        )}
      </FormWrapper>
      <Button onClick={createMatch} sx={{ marginTop: 5 }} disabled={!gamesAndPlayersValid}>
        Match erstellen
      </Button>{' '}
    </Paper>
  );
};
