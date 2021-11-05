import React, { useState } from 'react'

import { Grid } from '@mui/material'
import TodoCardContent from '../card/TodoCardContent'
import { deleteTodo } from '../../store/todo-actions'
import { useDispatch, useSelector } from 'react-redux'
import TodoCard from '../card/TodoCard'
import { addPin, removePin } from '../../store/user-actions'
import TodoDetails from './TodoDetails'
import TodoForm from '../form/TodoForm'
import Modal from '../layout/Modal'

export default function TodoItem({ todo }) {
  const isPinned = useSelector((state) => {
    return state.user.pinnedTodos.includes(todo._id)
  })
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(deleteTodo(todo._id))
    setShowModal(false)
  }

  const handlePin = () => {
    if (isPinned) {
      dispatch(removePin({ todoId: todo._id }))
      return
    }
    dispatch(addPin({ todoId: todo._id }))
  }

  const handleOpenEdit = () => {
    setShowModal(true)
    setIsEditing(true)
  }
  const handleOpenDetails = () => {
    setShowModal(true)
    setIsEditing(false)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setIsEditing(false)
  }

  const cardProps = {
    openEditHandler: handleOpenEdit,
    pinHandler: handlePin,
    isPinned: isPinned,
    title: todo.title,
    itemExists: true,
    removeHandler: handleRemove,
  }

  return (
    <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4} sx={{ height: 250 }}>
      <TodoCard {...cardProps}>
        <TodoCardContent
          todoItem={todo}
          small
          onClickHandler={handleOpenDetails}
        />
      </TodoCard>
      <Modal open={showModal} onClose={handleCloseModal}>
        {isEditing ? (
          <TodoForm
            todoItem={todo}
            isPinned={isPinned}
            pinHandler={handlePin}
            exitEditMode={handleOpenDetails}
          />
        ) : (
          <TodoDetails
            todoItem={todo}
            isPinned={isPinned}
            pinHandler={handlePin}
            openEditHandler={handleOpenEdit}
            removeHandler={handleRemove}
            lastEdit={todo.updatedAt}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </Grid>
  )
}
