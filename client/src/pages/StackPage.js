import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { useParams } from 'react-router'
import TodoCard from '../components/card/TodoCard'
import IconButton from '../components/button/IconButton'
import Modal from '../components/layout/Modal'
import TodoForm from '../components/form/TodoForm'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todo-actions'


export default function StackPage() {
  const [showModal, setShowModal] = useState(false)
  const { stack, todos, error } = useSelector(state => state.todo)
  const { slug } = useParams()
  const dispatch = useDispatch()
  
  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    dispatch(fetchTodos(`stack/${slug}`))
  }, [dispatch, slug])

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

          {stack && (
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
            >
              {stack.title.toUpperCase()}
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
        { stack && <TodoForm stackId={stack._id} closeForm={toggleShowModal}/>}
      </Modal>
    </>
  )
}
