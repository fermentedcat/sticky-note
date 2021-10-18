import { Grid } from '@mui/material'
import React from 'react'

export default function StackPage() {
  console.log("stack");
  return (
    <Grid 
      item 
      xs
      sx={{ 
        height: '100vh',
        boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)'
      }}
    >
    </Grid>
  )
}
