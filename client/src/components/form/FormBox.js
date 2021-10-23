import React from 'react';
import { Box } from '@mui/material';

export default function FormBox({ onSubmit, children }) {
  return (
    <Box
      onSubmit={onSubmit}
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {
          m: 1,
          width: 'auto',
        },
      }}
    >
      {children}
    </Box>
  );
}
