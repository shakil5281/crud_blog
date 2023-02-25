import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
    const style ={
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 1000
    }
    const positon ={
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      top: '50%',
      width: '100%',
      height: '100%',

    }
  return (
    <Box sx={style}>
      <Box sx={positon}>
      <CircularProgress />
      </Box>
    </Box>
  );
}