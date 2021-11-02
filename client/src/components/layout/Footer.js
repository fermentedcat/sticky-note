import React from 'react'
import { Box, Container, Typography, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        width: '100vw',
        bottom: 0,
        left: 0,
        p: 2,
        mt: 'auto',
        borderTop: '1px solid #ffbfd1',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Maja Thunberg 2021</Typography>
        <IconButton href="https://github.com/fermentedcat/todo-app">
          <GitHubIcon sx={{ color: 'rgb(25, 118, 210)' }} />
        </IconButton>
      </Container>
    </Box>
  )
}
