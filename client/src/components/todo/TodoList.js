import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import TodoItem from './TodoItem'

export default function TodoList({ todos, title }) {
  return (
    <Grid
      item
      xs
      sx={{
        height: '100%',
        boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
        paddingTop: 10,
        overflow: 'scroll',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {title && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{
              fontSize: '14px',
              marginTop: 3,
              color: 'rgb(25, 118, 210)',
            }}
          >
            {title}
          </Typography>
        )}

        <Grid
          container
          // justifyContent="stretch"
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
