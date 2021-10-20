import React, { useState } from 'react'

import useApi from '../../hooks/use-api'

import { Grid, Typography } from '@mui/material'
import Modal from '../layout/Modal'
import Card from '../card/Card'
import CardContent from '../card/CardContent'
import TodoForm from '../form/TodoForm'
import TodoCardHeader from './TodoCardHeader'
import TodoDetails from './TodoDetails'
import { deleteTodo } from '../../store/todo-actions'
import { useDispatch } from 'react-redux'

export default function TodoCard({ todo }) {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { callPost } = useApi()
  const dispatch = useDispatch()

  //TODO: get user to find pinned todo's from global array user pinned todos

  const handleOpenTodo = () => {
    setIsEditing(false)
    setShowModal(true)
  }

  const handleOpenEditTodo = () => {
    setIsEditing(true)
    setShowModal(true)
  }

  const handlePin = () => {
    callPost({ todoId: todo._id }, 'user/addPin')
  }

  const handleRemoveTodo = () => {
    dispatch(deleteTodo(todo._id))
    setShowModal(false)
  }

  return (
    <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4} sx={{ height: 250 }}>
      <Card>
        <TodoCardHeader
          editTodoHandler={handleOpenEditTodo}
          pinHandler={handlePin}
        />

        <CardContent onClickHandler={handleOpenTodo.bind(this, todo._id)}>
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
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Edit todo' : false}
      >
        {isEditing ? (
          <TodoForm todoItem={todo} closeForm={() => setIsEditing(false)}/>
        ) : (
          <TodoDetails
            todo={todo}
            editTodoHandler={handleOpenEditTodo}
            removeTodoHandler={handleRemoveTodo}
            pinHandler={handlePin}
          />
        )}
      </Modal>
    </Grid>
  )
}
