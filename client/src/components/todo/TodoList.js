import React from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import TodoItem from './TodoItem'

const gridItemStyle = {
  height: '100%',
  boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
  paddingTop: 14,
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    width: '0.25em',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ffbfd173',
  },
}

const boxStyle = {
  padding: 2,
  boxSizing: 'border-box',
  width: '100%',
  height: '2em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

export default function TodoList({
  stack,
  addTodoHandler,
  openEditStackHandler,
  todos,
  title,
}) {
  return (
    <Grid item xs sx={gridItemStyle}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={boxStyle}>
          <Box
            sx={{
              marginLeft: 0.5,
              display: 'flex',
              borderBottom: '1px solid rgb(25, 118, 210)',
            }}
          >
            {title && (
              <Typography
                variant="h6"
                component="h2"
                align="center"
                sx={titleStyle}
              >
                {title}
              </Typography>
            )}
            {stack && stack.description.length > 0 && (
              <Typography
                variant="h6"
                component="h2"
                align="center"
                sx={descriptionStyle}
              >
                {stack.description}
              </Typography>
            )}
          </Box>
          {stack && (
            <Box>
              <Button onClick={openEditStackHandler}>Edit Stack</Button>
              <Button onClick={addTodoHandler}>Add todo</Button>
            </Box>
          )}
        </Box>
        {todos && todos.length === 0 ? (
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
              {todos &&
                todos.map((todo, index) => {
                  return <TodoItem key={index} todo={todo} />
                })}
            </Grid>
          </>
        )}
      </Box>
    </Grid>
  )
}
