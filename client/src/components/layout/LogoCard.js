import React from 'react'
import { Card, CardMedia } from '@mui/material'

export default function LogoCard({ size }) {
  let dimensions = 250
  switch (size) {
    case 'lg': {
      dimensions = 250
      break
    }
    case 'sm': {
      dimensions = 120
      break
    }
    case 'xs': {
      dimensions = 50
      break
    }
    default: {
      dimensions = 250
      break
    }
  }

  return (
    <Card
      sx={{
        width: dimensions,
        height: dimensions,
        boxShadow: 'none',
        margin: 3,
        backgroundColor: 'transparent',
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image="/sticky-notes.png"
        alt="Sticky Notes logo by Freepik and Flaticon"
      />
    </Card>
  )
}
