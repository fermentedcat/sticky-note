import React from 'react'
import { Grid, Typography } from '@mui/material'
import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
  const sorted = [...todos]
  if (todos) {
    sorted.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }

  return todos.length === 0 ? (
    <div style={{ margin: '0 auto', marginTop: '30vh', width: '50vw' }}>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{ color: '#ffbfd1' }}
      >
        Nothing here yet...
      </Typography>
    </div>
  ) : (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        padding={2}
      >
        {sorted.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />
        })}
      </Grid>
    </>
  )
}
