import { useApolloClient } from '@apollo/client';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useDeleteGameMutation } from '../../graphql/mutations/__generated__/deleteGame';
import { useGamesQuery } from '../../graphql/queries/__generated__/games';
import { sortByName } from '../../helpers/sortByName';

export const GameList = () => {
  const apolloClient = useApolloClient();
  const { data } = useGamesQuery();
  const [deleteGame] = useDeleteGameMutation();

  const confirmAndDeleteGame = async (id: string, name: string) => {
    if (window.confirm(`Spiel ${name} wirklich löschen?`)) {
      await deleteGame({ variables: { id } });
      await apolloClient.refetchQueries({
        include: 'active',
      });
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 1, backgroundColor: (theme) => theme.palette.background.paper }}
    >
      <Typography variant="h4" mb={2}>
        Spiele
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Aktion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...(data?.games || [])].sort(sortByName).map(({ id, name, numberOfMatches }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    disabled={numberOfMatches !== 0}
                    onClick={() => {
                      confirmAndDeleteGame(id, name);
                    }}
                  >
                    löschen
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
