import React from 'react'
import TodoCard from '../card/TodoCard'
import TodoCardContent from '../card/TodoCardContent'

export default function TodoDetails(props) {
  const {
    todoItem,
    openEditHandler,
    removeHandler,
    pinHandler,
    isPinned,
    onClose,
  } = props

  return (
    <TodoCard
      itemExists
      title={todoItem.title}
      lastEdit={todoItem.lastEdit}
      openEditHandler={openEditHandler}
      removeHandler={removeHandler}
      pinHandler={pinHandler}
      isPinned={isPinned}
      onClose={onClose}
    >
      <TodoCardContent todoItem={todoItem} />
    </TodoCard>
  )
}
