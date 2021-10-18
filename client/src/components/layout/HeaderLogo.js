import React from 'react'
import { Box, Card, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

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
      <Card
        sx={{
          width: 50,
          height: 50,
          boxShadow: 'none',
          margin: 3,
          backgroundColor: 'transparent',
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image="/logo1.png"
          alt="Sticky Notes logo"
        />
      </Card>
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
