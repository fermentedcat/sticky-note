import React from 'react'

import CardHeader from '@mui/material/CardHeader'
import IconButton from '../button/IconButton'
import ActionsMenu from '../menu/ActionsMenu'
import Card from './Card'
import { Typography } from '@mui/material'

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

export default function TodoCard(props) {
  const {
    title,
    description,
    lastEdit,
    isEditing,
    exitEditMode,
    openEditHandler,
    submitHandler,
    removeHandler,
    leaveHandler,
    pinHandler,
    onClose,
    itemExists,
    isPinned,
    children,
  } = props

  let subheader
  if (lastEdit) {
    const date = new Date(lastEdit).toLocaleDateString('en-GB', 'DD-MM-YY')
    subheader = <Typography>Last edited: {date}</Typography>
  }
  if (description) {
    subheader = <Typography>{description}</Typography>
  }

  return (
    <Card>
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
        subheader={subheader}
        action={
          <ActionsMenu>
            {itemExists && !isEditing && (
              <IconButton
                type={isPinned ? 'unpin' : 'pin'}
                active
                description={isPinned ? 'unpin' : 'pin'}
                onClick={pinHandler}
              />
            )}
            {onClose && (
              <IconButton
                type={'exit'}
                active
                description={'close'}
                onClick={onClose}
              />
            )}
            {itemExists && (
              <IconButton
                type={!isEditing ? 'edit' : 'cancel'}
                active
                description={!isEditing ? 'edit' : 'cancel'}
                onClick={!isEditing ? openEditHandler : exitEditMode}
              />
            )}

            {(!itemExists || isEditing) && (
              <IconButton
                type="save"
                active
                description={'save'}
                onClick={submitHandler}
              />
            )}
            {leaveHandler && isEditing && (
              <IconButton
                type="leave"
                active
                p="0.2"
                description="leave stack"
                onClick={leaveHandler}
              />
            )}
            {removeHandler && isEditing && (
              <IconButton
                type="delete"
                active
                description="delete"
                onClick={removeHandler}
              />
            )}
          </ActionsMenu>
        }
      />
      {children}
    </Card>
  )
}
