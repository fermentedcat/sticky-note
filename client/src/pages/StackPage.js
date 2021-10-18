import React from 'react'
import { Grid, Box, Paper, Button, Typography } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import useApi from '../hooks/use-api'
import { useParams } from 'react-router'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function StackPage() {
  const { slug } = useParams()

  const { data, error, token, callGet, callPost, callDelete, setData } = useApi(
    `stack/${slug}`
  )

  const handleOpenTodo = (id) => {
    console.log('open todo', id)
  }

  return (
    <Grid
      item
      xs
      sx={{
        height: '100%',
        boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
        paddingTop: 10,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {data && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
          >
            {data.stack.title.toUpperCase()}
          </Typography>
        )}
        { error && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
          >
            {error}
          </Typography>
        )}
        <Grid
          container
          // justifyContent="stretch"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          padding={2}
        >
          {data &&
            data.todos.map((todo) => {
              return (
                <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4}>
                  <Item
                    component={Button}
                    onClick={handleOpenTodo.bind(this, todo._id)}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    {todo.title}
                  </Item>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </Grid>
  )
}
