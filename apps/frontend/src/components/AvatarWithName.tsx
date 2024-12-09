import { Avatar, Box } from '@mui/material';
import { VFC } from 'react';

interface AvatarWithNameProps {
  name: string;
}

export const AvatarWithName: VFC<AvatarWithNameProps> = ({ name }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <Avatar src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} />
    <Box sx={{ marginTop: '4px' }}>{name}</Box>
  </Box>
);
