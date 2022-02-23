import { Avatar, Box } from '@mui/material';
import { VFC } from 'react';

interface AvatarWithNameProps {
  name: string;
}

export const AvatarWithName: VFC<AvatarWithNameProps> = ({ name }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <Avatar src={`https://avatars.dicebear.com/api/bottts/${name}.svg`} />
    <Box sx={{ marginTop: '4px' }}>{name}</Box>
  </Box>
);
