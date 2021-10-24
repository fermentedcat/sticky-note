import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import LogoCard from './LogoCard'

export default function HeaderLogo() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <LogoCard size="xs" />
      <Box>
        <Typography
          variant="h6"
          component="h6"
          sx={{ fontWeight: 800, color: '#ffbfd1' }}
        >
          STICKY NOTE
        </Typography>
      </Box>
    </Box>
  )
}
