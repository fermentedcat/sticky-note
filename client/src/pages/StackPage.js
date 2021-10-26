import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from '../store/todo-actions'
import { uiActions } from '../store/ui-slice'

import TodoList from '../components/todo/TodoList'

export default function StackPage() {
  const { stack, todos } = useSelector((state) => state.todo)
  const { slug } = useParams()
  const dispatch = useDispatch()

  const toggleShowModal = () => {
    dispatch(
      uiActions.setModal({ type: 'add_todo', props: { stackId: stack._id } })
    )
  }

  useEffect(() => {
    dispatch(fetchTodos(`stack/${slug}`))
  }, [dispatch, slug])

  // TODO: Sort by lastEdit
  // const dateOrderedTodoList = []

  let title = ''
  if (stack) title = stack.title.toUpperCase()

  return (
    todos && (
      <TodoList
        stack={stack}
        addTodoHandler={toggleShowModal}
        todos={todos}
        title={title}
      />
    )
  )
}
