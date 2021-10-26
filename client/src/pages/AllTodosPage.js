import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todo-actions'
import TodoList from '../components/todo/TodoList'

export default function HomePage() {
  const { todos } = useSelector((state) => state.todo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return <TodoList todos={todos} title="ALL TODO LISTS" />
}
