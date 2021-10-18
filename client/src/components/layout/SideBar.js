import { Grid } from '@mui/material'
import React from 'react'

export default function SideBar() {
  return (
    <Grid 
      item 
      xs={2.2}
      sx={{ 
        height: '100vh',
        minWidth: '240px',
        boxShadow: '-2px 0px 19px 0px rgba(255,191,209,0.34)'
      }}
      >
    </Grid>
  )
}
