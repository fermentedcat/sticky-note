import React from 'react'
import { Box, Card, CardMedia, Typography } from '@mui/material'

export default function Logo() {
  return (
    <Box
      sx={{
        // width: 800,
        // height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Card
        sx={{
          width: 250,
          height: 250,
          boxShadow: 'none',
          margin: 3
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
