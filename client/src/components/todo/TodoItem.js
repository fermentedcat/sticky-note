import React, { useState } from 'react'

import { Grid } from '@mui/material'
import Modal from '../layout/Modal'
import TodoCardContent from '../card/TodoCardContent'
import TodoForm from '../form/TodoForm'
import { deleteTodo } from '../../store/todo-actions'
import { useDispatch } from 'react-redux'
import TodoCard from '../card/TodoCard'

export default function TodoItem({ todo }) {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPinned, setIsPinned] = useState(false) //TODO: use this
  const dispatch = useDispatch()

  const handleOpenTodo = () => {
    setIsEditing(false)
    setShowModal(true)
  }

  const handleOpenEditTodo = () => {
    setIsEditing(true)
    setShowModal(true)
  }

  const toggleIsEditing = () => setIsEditing(!isEditing)

  const toggleShowModal = () => setShowModal(!showModal)

  const handleRemoveTodo = () => {
    dispatch(deleteTodo(todo._id))
    setShowModal(false)
  }

  const handlePin = () => {
    // callPost({ todoId: todo._id }, 'user/addPin')
  }

  const cardProps = {
    openEditHandler: handleOpenEditTodo,
    toggleIsEditing: toggleIsEditing,
    isEditing: isEditing,
    pinHandler: handlePin,
    isPinned: isPinned,
  }

  const contentProps = { todo }

  // remove-option on opened todo
  if (showModal) cardProps.removeHandler = handleRemoveTodo

  // opened card scrollable, not clickable
  if (!showModal) contentProps.onClickHandler = handleOpenTodo
  else contentProps.scroll = true

  const todoContent = (
    <TodoCard {...cardProps}>
      <TodoCardContent {...contentProps} />
    </TodoCard>
  )

  return (
    <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4} sx={{ height: 250 }}>
      {todoContent}

      <Modal open={showModal} onClose={toggleShowModal}>
        {isEditing ? (
          <TodoCard {...cardProps}>
            <TodoForm todoItem={todo} closeForm={() => setIsEditing(false)} />
          </TodoCard>
        ) : (
          todoContent
        )}
      </Modal>
    </Grid>
  )
}
