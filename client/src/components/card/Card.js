import React from 'react'
import MuiCard from '@mui/material/Card'

const style = {
  overflow: 'unset',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 7px 12px -4px rgba(50,30,10,0.15)',
  height: '100%',
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgb(255,255,249)",
  justifyContent: "space-between"
}

export default function Card({children}) {
  return (
    <MuiCard sx={style}>
      {children}
    </MuiCard>
  )
}
