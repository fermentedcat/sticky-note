import React from 'react'

import { Typography } from '@mui/material'
import Card from '../card/Card'
import CardContent from '../card/CardContent'
import TodoCardHeader from './TodoCardHeader'

export default function TodoDetails({ editTodoHandler, removeTodoHandler, pinHandler, todo }) {
  return (
    <Card>
      <TodoCardHeader
        editTodoHandler={editTodoHandler}
        pinHandler={pinHandler}
        removeTodoHandler={removeTodoHandler}
        remove
      />

      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: 'left', alignSelf: 'start' }}
        >
          {todo.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'left', alignSelf: 'start' }}
        >
          {todo.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
