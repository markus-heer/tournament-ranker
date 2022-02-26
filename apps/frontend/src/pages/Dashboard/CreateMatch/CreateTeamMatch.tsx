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
import { sortByName } from '../../../helpers/sortByName';
import { PlayerTeam, Team } from './Team';
import { RanksObject, TeamRank } from './TeamRank';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type TeamsObject = Record<string, number>;

export const CreateTeamMatch: VFC = () => {
  const { data: playersData, loading: playersLoading } = usePlayersQuery();
  const { data: gamesData, loading: gamesLoading } = useGamesQuery();
  const [createMatchMutation] = useCreateMatchMutation();
  const apolloClient = useApolloClient();

  const [playerTeams, setPlayerTeams] = useState<TeamsObject>({});
  const [teamRanks, setTeamRanks] = useState<RanksObject>({});
  const [game, setGame] = useState<string>('');

  const loading = playersLoading || gamesLoading;

  const setInitialData = useCallback(() => {
    if (gamesData && playersData) {
      const initialPlayerTeams: TeamsObject = {};
      playersData.players.forEach(({ id }) => {
        initialPlayerTeams[id] = 0;
      });
      setPlayerTeams(initialPlayerTeams);
      setTeamRanks({});
    }
  }, [gamesData, playersData]);

  useEffect(() => {
    setInitialData();
  }, [gamesData, playersData, setInitialData]);

  const getHighestTeam = () => {
    let highestTeam = 0;
    Object.keys(playerTeams).forEach((playerId) => {
      if (playerTeams[playerId] > highestTeam) {
        highestTeam = playerTeams[playerId];
      }
    });
    return highestTeam;
  };

  const onDropPlayer =
    (teamId: number) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => {
      setPlayerTeams({ ...playerTeams, [player.id]: teamId });

      if (teamRanks[teamId] === undefined) {
        // eslint-disable-next-line no-console
        console.log('new team');
        setTeamRanks({ ...teamRanks, [teamId]: 0 });
      }
    };

  const onDropTeam = (rank: number) => (team: PlayerTeam) => {
    setTeamRanks({ ...teamRanks, [team.id]: rank });
  };

  const getPlayerObjectsFromTeam = (team: number) => {
    const playerIds = Object.keys(playerTeams);

    let players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[] = [];

    playerIds.forEach((playerId) => {
      if (playerTeams[playerId] === team) {
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

  const getTeamObjectsFromRank = (rank: number) => {
    const teamIds = Object.keys(teamRanks);

    let teams: PlayerTeam[] = [];

    teamIds.forEach((teamId) => {
      const id = Number(teamId);
      if (teamRanks[id] === rank) {
        teams = [...teams, { id, players: getPlayerObjectsFromTeam(id) }];
      }
    });

    return teams.sort((a, b) => a.id - b.id);
  };

  const createMatch = async () => {
    // TODO: send

    setInitialData();

    setGame(gamesData?.games[0]?.id || '');

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
                <Team
                  id={0}
                  onDropPlayer={onDropPlayer(0)}
                  players={getPlayerObjectsFromTeam(0)}
                />
                {Array.from(Array(2 + 2).keys()).map((rank) => (
                  <TeamRank
                    key={rank}
                    rank={rank}
                    onDropTeam={onDropTeam(rank)}
                    teams={getTeamObjectsFromRank(rank)}
                    onDropPlayerOnTeam={onDropPlayer}
                    getHighestTeam={getHighestTeam}
                    teamRanks={teamRanks}
                    getPlayerObjectsFromTeam={getPlayerObjectsFromTeam}
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
