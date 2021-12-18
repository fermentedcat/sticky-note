import React from 'react'
import { Box, Typography } from '@mui/material'
import LogoCard from './LogoCard'

export default function LandingLogo() {
  return (
    <Box
      id="landingLogo"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <LogoCard />
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800 }}>
          STICKY NOTE
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontWeight: 800 }}
        >
          your favorite todo app
        </Typography>
      </Box>
    </Box>
  )
}
