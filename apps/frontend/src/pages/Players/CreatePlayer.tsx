import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useState, VFC } from 'react';

import { useCreatePlayerMutation } from '../../graphql/mutations/__generated__/createPlayer';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreatePlayer: VFC = () => {
  const [createPlayerMutation] = useCreatePlayerMutation();
  const apolloClient = useApolloClient();

  const [name, setName] = useState<string | null>(null);

  const createPlayer = async () => {
    if (name) {
      await createPlayerMutation({ variables: { data: { name } } });

      setName('');

      await apolloClient.refetchQueries({
        include: 'active',
      });
    }
  };

  return (
    <Paper variant="outlined" sx={{ padding: 1, display: 'flex' }}>
      <Wrapper>
        <FormWrapper>
          <Typography variant="h4" mb={2}>
            Spieler erstellen
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormWrapper>
        <Button onClick={createPlayer} sx={{ marginTop: 5 }} disabled={!name}>
          Spieler erstellen
        </Button>
      </Wrapper>
    </Paper>
  );
};
