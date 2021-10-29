import React, { useState } from 'react'

import { Grid } from '@mui/material'
import Modal from '../layout/Modal'
import TodoCardContent from '../card/TodoCardContent'
import TodoForm from '../form/TodoForm'
import { deleteTodo } from '../../store/todo-actions'
import { useDispatch, useSelector } from 'react-redux'
import TodoCard from '../card/TodoCard'
import { addPin, removePin } from '../../store/user-actions'

export default function TodoItem({ todo }) {
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const isPinned = useSelector((state) => {
    return state.user.pinnedTodos.includes(todo._id)
  })
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
    if (isPinned) {
      dispatch(removePin({ todoId: todo._id }))
      return
    }
    dispatch(addPin({ todoId: todo._id }))
  }

  const cardProps = {
    openEditHandler: handleOpenEditTodo,
    toggleIsEditing: toggleIsEditing,
    isEditing: isEditing,
    pinHandler: handlePin,
    isPinned: isPinned,
    title: todo.title,
  }

  const contentProps = {
    todo,
    small: !showModal,
  }

  return (
    <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4} sx={{ height: 250 }}>
      <TodoCard {...cardProps}>
        <TodoCardContent {...contentProps} onClickHandler={handleOpenTodo} />
      </TodoCard>

      <Modal open={showModal} onClose={toggleShowModal}>
        {isEditing ? (
          <TodoCard {...cardProps}>
            <TodoForm
              todoItem={todo}
              removeHandler={handleRemoveTodo}
              closeForm={() => setIsEditing(false)}
            />
          </TodoCard>
        ) : (
          <TodoCard
            {...cardProps}
            lastEdit={todo.updatedAt}
            removeHandler={handleRemoveTodo}
          >
            <TodoCardContent {...contentProps} />
          </TodoCard>
        )}
      </Modal>
    </Grid>
  )
}
