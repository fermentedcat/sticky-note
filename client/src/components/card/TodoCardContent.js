import React from 'react'
import MuiCardContent from '@mui/material/CardContent'
import { Button, Box, Typography } from '@mui/material'
import Markdown from '../markdown/Markdown'

const cardStyle = {
  boxShadow: 'none',
  textTransform: 'none',
  color: 'unset',
  overflow: 'hidden',
  padding: '1.2em',
  paddingBottom: '1.2em !important',
  flexGrow: 1,
  alignItems: 'flex-start',
}

const innerStyle = {
  width: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
}

export default function TodoCardContent({ onClickHandler, scroll, todo }) {
  const cardProps = { sx: cardStyle }

  if (onClickHandler) {
    cardProps.component = Button
    cardProps.onClick = onClickHandler
  }

  if (scroll) {
    innerStyle.overflow = 'scroll'
  }

  return (
    <MuiCardContent {...cardProps}>
      <Box sx={innerStyle}>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: 'left' }}
        >
          {todo.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'left' }}
        >
          {todo.description}
        </Typography>
        <Markdown text={todo.markdown} />
      </Box>
    </MuiCardContent>
  )
}
