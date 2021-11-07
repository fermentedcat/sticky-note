import React from 'react'
import { Grid, Box } from '@mui/material'

export default function PageWrapper({ children }) {
  return (
    <Grid
      item
      xs
      sx={{
        height: '100%',
        boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
        paddingTop: 14,
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
          width: '0.25em',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ffbfd173',
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Grid>
  )
}
