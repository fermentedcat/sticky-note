import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useApi from '../hooks/use-api'
import { useParams } from 'react-router'
import TodoCard from '../components/card/TodoCard'

export default function StackPage() {
  const { slug } = useParams()

  const { data, error } = useApi(`stack/${slug}`)

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
        {error && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
          >
            {error}
          </Typography>
        )}

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

        <Grid
          container
          // justifyContent="stretch"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          padding={2}
        >
          {data &&
            data.todos.map((todo, index) => {
              return <TodoCard key={index} todo={todo} />
            })}
        </Grid>
      </Box>
    </Grid>
  )
}
