import React from 'react'
import { Card, CardHeader, Typography } from '@mui/material'
import ActionsMenu from '../menu/ActionsMenu'
import IconButton from '../button/IconButton'

const cardStyle = {
  overflow: 'unset',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 7px 12px -4px rgba(50,30,10,0.15)',
  minHeight: '45vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(255,255,249)',
}
const headerStyle = {
  height: 'fit-content',
  maxHeight: '10ch',
  padding: 1.1,
  paddingRight: 1.6,
  color: '#ffbfd1',
  borderBottom: '1px dashed #ffbfd1',
  div: {
    maxHeight: '100%',
  },
  '.MuiCardHeader-content': {
    overflow: 'hidden',
  },
  '.MuiCardHeader-action': {
    overflow: 'unset',
  },
}

export default function ProfileCard({
  title,
  isEditing,
  toggleEdit,
  submitHandler,
  children,
}) {
  return (
    <Card sx={cardStyle}>
      {title && (
        <CardHeader
          sx={headerStyle}
          title={
            <Typography
              variant="h6"
              component="h4"
              sx={{ overflow: 'unset', fontSize: '16px', fontWeight: 'bold' }}
            >
              {title}
            </Typography>
          }
          action={
            <ActionsMenu>
              <IconButton
                type={!isEditing ? 'edit' : 'cancel'}
                active
                description={!isEditing ? 'edit' : 'cancel'}
                onClick={toggleEdit}
              />

              {isEditing && (
                <IconButton
                  type="save"
                  active
                  description={'save'}
                  onClick={submitHandler}
                />
              )}
            </ActionsMenu>
          }
        />
      )}
      {children}
    </Card>
  )
}
