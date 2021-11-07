import React from 'react'
import { Box, Typography } from '@mui/material'

const wrapperStyle = {
  padding: 2,
  boxSizing: 'border-box',
  width: '100%',
  height: '2em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const titleWrapperStyle = {
  marginLeft: 0.5,
  display: 'flex',
  borderBottom: '1px solid rgb(25, 118, 210)',
}

const titleStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'rgb(25, 118, 210)',
}

const descriptionStyle = {
  marginLeft: 2,
  fontSize: '14px',
  color: 'rgb(25, 118, 210)',
}

export default function PageHeaderWrapper({
  title = '',
  description = '',
  children,
}) {
  return (
    <Box sx={wrapperStyle}>
      <Box sx={titleWrapperStyle}>
        <Typography variant="h6" component="h2" align="center" sx={titleStyle}>
          {title}
        </Typography>
        {description.length > 0 && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={descriptionStyle}
          >
            {description}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  )
}
