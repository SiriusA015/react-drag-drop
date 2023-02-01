import React from 'react';
import { Box } from '@mui/system';
import { COLUMN_WIDTH, GUTTER_SIZE, NUM_COLUMNS } from '../constants';

type GridProps = {
  height: number;
};

const Grid = (props: GridProps) => {
  const { height } = props;
  const numRows = Math.round(height / 2 / GUTTER_SIZE) + 10;
  return (
    <Box position="absolute" width="100%" height="100%" sx={{ pointerEvents: 'none' }}>
      {/* Columns */}
      {[...Array(NUM_COLUMNS)].map((v, index) => (
        <Box
          key={index}
          position="absolute"
          width={COLUMN_WIDTH - GUTTER_SIZE}
          top={0}
          bottom={0}
          left={(index * COLUMN_WIDTH) + GUTTER_SIZE}
          sx={{
            borderWidth: '0 1px',
            borderStyle: 'dashed',
            borderColor: '#ccc',
          }}
        />
      ))}

      {/* Rows */}
      {[...Array(numRows)].map((v, index) => (
        <Box
          key={index}
          height={GUTTER_SIZE}
          marginBottom={`${GUTTER_SIZE}px`}
          bgcolor="#efefef"
        />
      ))}
    </Box>
  );
};

export default React.memo(Grid);
