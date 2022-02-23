import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState, VFC } from 'react';

import { GqlFullPlayerFragment } from '../../graphql/fragments/__generated__/fullPlayer';
import { usePlayersQuery } from '../../graphql/queries/__generated__/players';
import { CreateMatch } from './CreateMatch/CreateMatch';
import { MatchHistory } from './MatchHistory/MatchHistory';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 20px;
`;

type PlayerWithRank = GqlFullPlayerFragment & { rank: number | '' };

export const Leaderboard: VFC = () => {
  const { data, loading, refetch } = usePlayersQuery();
  const [sortedPlayers, setSortedPlayers] = useState<PlayerWithRank[] | undefined>();

  useEffect(() => {
    if (data) {
      const players = [...data.players];
      const sortedPlayerList = players.sort((a, b) => b.elo - a.elo);

      let playersWithRank: PlayerWithRank[] = [];

      sortedPlayerList.forEach((player, index) => {
        if (index === sortedPlayerList.length - 1) {
          playersWithRank = [...playersWithRank, { ...player, rank: sortedPlayerList.length }];
        } else {
          if (sortedPlayerList[index + 1].elo === player.elo) {
            playersWithRank = [...playersWithRank, { ...player, rank: '' }];
          } else {
            playersWithRank = [...playersWithRank, { ...player, rank: index + 1 }];
          }
        }
      });

      setSortedPlayers(playersWithRank);
    }
  }, [data]);

  if (loading) return <div>'Loading...'</div>;

  return (
    <Wrapper>
      <Paper
        variant="outlined"
        sx={{ padding: 1, backgroundColor: (theme) => theme.palette.background.paper }}
      >
        <Typography variant="h4" mb={2}>
          Rangliste
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Platz</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Matches</TableCell>
                <TableCell align="right">Elo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPlayers?.map(({ id, name, elo, rank }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {rank}
                  </TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right">100</TableCell>
                  <TableCell align="right">{elo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CreateMatch onSubmit={refetch} />
      <MatchHistory />
    </Wrapper>
  );
};
