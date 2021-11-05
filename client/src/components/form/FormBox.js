import React from 'react'
import { Box, Container } from '@mui/material'

export default function FormBox({ onSubmit, children }) {
  return (
    <Container sx={{ p: '.5em !important' }}>
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
    </Container>
  )
}
