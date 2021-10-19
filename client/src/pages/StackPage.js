import React, { useState } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useApi from '../hooks/use-api'
import { useParams } from 'react-router'
import TodoCard from '../components/card/TodoCard'
import IconButton from '../components/button/IconButton'
import Modal from '../components/layout/Modal'
import TodoForm from '../components/form/TodoForm'

export default function StackPage() {
  const [showModal, setShowModal] = useState(false)
  const { slug } = useParams()
  const { data, error } = useApi(`stack/${slug}`)

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  //TODO: Sort by lastEdit
  // const dateOrderedTodoList = []

  return (
    <>
      <Grid
        item
        xs
        sx={{
          height: '100%',
          boxShadow: '5px 0px 19px 0px rgba(255,191,209,0.34)',
          paddingTop: 10,
          overflow: 'scroll'
        }}
      >
        <IconButton type="add" fixed active bottomDescr description="add new todo" onClick={toggleShowModal}/>
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
      <Modal
        open={showModal}
        onClose={toggleShowModal}
        title="Add todo"
      >
        { data && <TodoForm stackId={data.stack._id}/>}
      </Modal>
    </>
  )
}
