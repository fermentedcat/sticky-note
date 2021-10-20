import React from 'react'

import CardHeader from '@mui/material/CardHeader'
import IconButton from '../button/IconButton'
import ActionsMenu from '../menu/ActionsMenu'


const style = {
  height: 'fit-content',
  padding: 1.1,
  paddingRight: 1.6,
  color: '#ffbfd1',
  borderBottom: '1px dotted #ffbfd1',
}

export default function TodoCardHeader(props) {
  const { editTodoHandler, pinHandler, remove, removeTodoHandler, pinned } = props

  return (
    <CardHeader
      sx={style}
      action={
        <ActionsMenu>
          <IconButton
            type={pinned ? "unpin" : "pin"}
            active
            description={pinned ? "unpin" : "pin"}
            onClick={pinHandler}
          />
          <IconButton
            type="edit"
            active
            description="edit"
            onClick={editTodoHandler}
          />
          {remove && (
            <IconButton
              type="delete"
              active
              description="delete"
              onClick={removeTodoHandler}
            />
          )}
        </ActionsMenu>
      }
    />
  )
}
