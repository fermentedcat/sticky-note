import React from 'react'
import MuiCardContent from '@mui/material/CardContent'
import { Button, Box } from '@mui/material'
import Markdown from '../markdown/Markdown'

const cardStyle = {
  boxShadow: 'none',
  textTransform: 'none',
  maxHeight: '100%',
  overflow: 'hidden',
  padding: '1.2em',
  paddingBottom: '1.2em !important',
  flexGrow: 1,
  alignItems: 'flex-start',
  '.MuiTouchRipple-root': {
    zIndex: '3',
  },
}

const innerStyle = {
  width: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
}

export default function TodoCardContent({ onClickHandler, small, todoItem }) {
  const cardProps = { sx: cardStyle }

  if (onClickHandler) {
    cardProps.component = Button
    cardProps.onClick = onClickHandler
    cardProps.color = 'secondary'
  }

  if (!small) {
    cardStyle.overflow = 'scroll'
  }

  return (
    <MuiCardContent {...cardProps}>
      <Box sx={innerStyle}>
        <Markdown text={todoItem.markdown} small={small} />
      </Box>
    </MuiCardContent>
  )
}
