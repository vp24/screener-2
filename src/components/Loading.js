import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
      <CircularProgress />
      <Typography variant="h6" component="div" style={{ marginLeft: '10px' }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;