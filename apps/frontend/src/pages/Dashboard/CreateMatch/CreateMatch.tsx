import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useCallback, useEffect, useState, VFC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useCreateMatchMutation } from '../../../graphql/mutations/__generated__/createMatch';
import { useGamesQuery } from '../../../graphql/queries/__generated__/games';
import { usePlayersQuery } from '../../../graphql/queries/__generated__/players';
import { GqlGameType, GqlMatchCreateSingleInput } from '../../../graphql/types';
import { SingleMatchForm } from './SingleMatchForm';
import { TeamMatchForm } from './TeamMatchForm';

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
    }
  }, [gamesData, playersData]);

  useEffect(() => {
    setInitialData();
  }, [gamesData, playersData, setInitialData]);

  const createMatch = async () => {
    alert('Not yet implemented');
    /* const playerIds = Object.keys(playerRanks);

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

    setGame(gamesData?.games[0]?.id || '');

    await apolloClient.refetchQueries({
      include: 'active',
    }); */
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
              {gamesData?.games.map(({ id, name, gameType }) => (
                <MenuItem key={id} value={id}>
                  {name}
                  {gameType === GqlGameType.Team ? ' (Team)' : ''}
                </MenuItem>
              ))}
            </Select>
            <DndProvider backend={HTML5Backend}>
              {gamesData?.games.find(
                ({ gameType, id }) => id === game && gameType === GqlGameType.Single,
              ) ? (
                <SingleMatchForm gamesData={gamesData} playersData={playersData} />
              ) : (
                <TeamMatchForm gamesData={gamesData} playersData={playersData} />
              )}
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
