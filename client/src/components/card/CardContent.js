import React from 'react'
import MuiCardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'

const style = {
  width: '100%',
  height: '100%',
  boxShadow: 'none',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  textTransform: 'none',
}

export default function CardContent({onClickHandler, children}) {
  const props = {
    sx: style
  }
  
  if (onClickHandler) {
    props.component = Button
    props.onClick = onClickHandler
  }

  return (
    <MuiCardContent {...props} >
      {children}
    </MuiCardContent>
  )
}
