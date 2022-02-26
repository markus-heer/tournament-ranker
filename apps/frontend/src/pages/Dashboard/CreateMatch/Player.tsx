import { Avatar, Chip } from '@mui/material';
import { VFC } from 'react';
import { useDrag } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';

export const Player: VFC<Pick<GqlFullPlayerFragment, 'id' | 'name'>> = ({ id, name }) => {
  const [, drag] = useDrag(
    () => ({
      type: 'player',
      item: { id, name },
    }),
    [id, name],
  );

  return (
    <Chip
      ref={drag}
      label={name}
      avatar={<Avatar src={`https://avatars.dicebear.com/api/bottts/${name}.svg`} />}
      sx={{ cursor: 'grab' }}
    ></Chip>
  );
};
