import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState, VFC } from 'react';

import { GqlFullPlayerFragment } from '../../graphql/fragments/__generated__/fullPlayer';
import { usePlayersQuery } from '../../graphql/queries/__generated__/players';

export const Leaderboard: VFC = () => {
  const { data, loading } = usePlayersQuery();
  const [sortedPlayers, setSortedPlayers] = useState<GqlFullPlayerFragment[] | undefined>();

  useEffect(() => {
    if (data) {
      const players = [...data.players];
      setSortedPlayers(players.sort((a, b) => b.elo - a.elo));
    }
  }, [data]);

  if (loading) return <div>'Loading...'</div>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Matches</TableCell>
            <TableCell align="right">Elo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers?.map(({ id, name, elo }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">100</TableCell>
              <TableCell align="right">{elo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
