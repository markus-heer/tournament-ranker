import styled from '@emotion/styled';
import { InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useEffect, useState, VFC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useGamesQuery } from '../../../graphql/queries/__generated__/games';
import { usePlayersQuery } from '../../../graphql/queries/__generated__/players';
import { GqlGameType } from '../../../graphql/types';
import { SingleMatchForm } from './SingleMatch/SingleMatchForm';
import { TeamMatchForm } from './TeamMatch/TeamMatchForm';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateMatch: VFC = () => {
  const { data: playersData, loading: playersLoading } = usePlayersQuery();
  const { data: gamesData, loading: gamesLoading } = useGamesQuery();

  const [gameId, setGameId] = useState<string>('');

  const loading = playersLoading || gamesLoading;

  useEffect(() => {
    setGameId(gamesData?.games[0]?.id || '');
  }, [setGameId, gamesData]);

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
              value={gameId}
              label="Spiel"
              onChange={(e) => setGameId(e.target.value)}
            >
              {gamesData?.games.map(({ id, name, gameType }) => (
                <MenuItem key={id} value={id}>
                  {name}
                  {gameType === GqlGameType.Team ? ' (Team)' : ' (Single)'}
                </MenuItem>
              ))}
            </Select>
            <DndProvider backend={HTML5Backend}>
              {gamesData?.games.find(
                ({ gameType, id }) => id === gameId && gameType === GqlGameType.Single,
              ) ? (
                <SingleMatchForm
                  gamesData={gamesData}
                  playersData={playersData}
                  gameId={gameId}
                  setGameId={setGameId}
                />
              ) : (
                <TeamMatchForm
                  gamesData={gamesData}
                  playersData={playersData}
                  gameId={gameId}
                  setGameId={setGameId}
                />
              )}
            </DndProvider>
          </>
        ) : (
          <Typography variant="h6" mb={2}>
            Bitte erst ein Spiel und mindestens 2 Spieler anlegen
          </Typography>
        )}
      </FormWrapper>
    </Paper>
  );
};
