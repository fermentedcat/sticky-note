import React from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import TodoItem from './TodoItem'
// import IconButton from '../button/IconButton'

export default function TodoList({
  stack,
  addTodoHandler,
  openEditStackHandler,
  todos,
  title,
}) {
  return (
    <Grid
      item
      xs
      sx={{
        height: '100%',
        boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
        paddingTop: 10,
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
          width: '0.25em',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ffbfd173',
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            padding: 2,
            boxSizing: 'border-box',
            width: '100%',
            height: '5em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title && (
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'rgb(25, 118, 210)',
              }}
            >
              {title}
            </Typography>
          )}
          {stack && (
            <Box>
              <Button onClick={openEditStackHandler}>Edit Stack</Button>
              <Button onClick={addTodoHandler}>Add todo</Button>
            </Box>
          )}
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          padding={2}
        >
          {todos &&
            todos.map((todo, index) => {
              return <TodoItem key={index} todo={todo} />
            })}
        </Grid>
      </Box>
    </Grid>
  )
}
