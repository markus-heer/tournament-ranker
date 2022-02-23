import { Avatar, Chip } from '@mui/material';
import { VFC } from 'react';
import { useDrag } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';

export const Player: VFC<Pick<GqlFullPlayerFragment, 'id' | 'name'>> = ({ id, name }) => {
  const [{}, drag] = useDrag(
    () => ({
      type: 'player',
      item: { id, name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  );

  return (
    <Chip
      ref={drag}
      label={name}
      avatar={<Avatar>{name[0]}</Avatar>}
      sx={{ cursor: 'grab' }}
    ></Chip>
  );
};
