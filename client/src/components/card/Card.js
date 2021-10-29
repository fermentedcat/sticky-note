import React from 'react'
import MuiCard from '@mui/material/Card'
import { CardHeader } from '@mui/material'

const cardStyle = {
  overflow: 'unset',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 7px 12px -4px rgba(50,30,10,0.15)',
  height: '100%',
  maxHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(255,255,249)',
}
const headerStyle = {
  height: 'fit-content',
  padding: 1.1,
  paddingRight: 1.6,
  color: '#ffbfd1',
  borderBottom: '1px dotted #ffbfd1',
}

export default function Card({ title, children }) {
  return (
    <MuiCard sx={cardStyle}>
      {title && <CardHeader title={title} sx={headerStyle} />}
      {children}
    </MuiCard>
  )
}
