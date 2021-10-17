import React from 'react';
import { Box } from '@mui/material';

export default function FormBox({ onSubmit, children }) {
  return (
    <Box
      onSubmit={onSubmit}
      component="form"
      sx={{
        '& .MuiTextField-root': {
          m: 1,
          width: '25ch',
        },
      }}
    >
      {children}
    </Box>
  );
}
