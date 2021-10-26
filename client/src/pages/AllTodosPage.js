import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todo-actions'
import TodoList from '../components/todo/TodoList'

export default function HomePage() {
  const { todos, error } = useSelector((state) => state.todo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  useEffect(() => {
    // TODO: dispatch notification
    console.log(error)
  }, [error])

  return <TodoList todos={todos} title="ALL TODO LISTS" />
}
