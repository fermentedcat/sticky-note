import React from 'react';
import { Card, CardMedia } from '@mui/material';

export default function LogoCard({size = 'lg'}) {
  const dimensions = size === 'lg' ? 250 : 50

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
  );
}
