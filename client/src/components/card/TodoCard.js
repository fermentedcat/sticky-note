import React from 'react'
import MuiCard from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'
import IconButton from '../button/IconButton'
import ActionsMenu from '../menu/ActionsMenu'

const cardStyle = {
  overflow: 'unset',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 7px 12px -4px rgba(50,30,10,0.15)',
  height: '100%',
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

export default function Card({
  openEditHandler,
  toggleIsEditing,
  isEditing,
  removeHandler,
  pinHandler,
  isPinned,
  children,
}) {
  return (
    <MuiCard sx={cardStyle}>
      <CardHeader
        sx={headerStyle}
        action={
          <ActionsMenu>
            <IconButton
              type={isPinned ? 'unpin' : 'pin'}
              active
              description={isPinned ? 'unpin' : 'pin'}
              onClick={pinHandler}
            />
            <IconButton
              type={!isEditing ? 'edit' : 'cancel'}
              active
              description={!isEditing ? 'edit' : 'cancel'}
              onClick={!isEditing ? openEditHandler : toggleIsEditing}
            />
            {removeHandler && (
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
    </MuiCard>
  )
}
