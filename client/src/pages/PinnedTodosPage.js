import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPinned } from '../store/user-actions'
import { todoActions } from '../store/todo-slice'
import TodoList from '../components/todo/TodoList'

export default function HomePage() {
  const { todos } = useSelector((state) => state.todo)

  const dispatch = useDispatch()

  useEffect(async () => {
    try {
      const response = await dispatch(fetchPinned())
      const pinned = response.payload
      dispatch(todoActions.setTodos(pinned))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  return <TodoList todos={todos} title="PINNED TODO'S" />
}
