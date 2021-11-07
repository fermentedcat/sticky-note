import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todo-actions'
import TodoList from '../components/todo/TodoList'
import PageWrapper from '../components/layout/PageWrapper'
import PageHeaderWrapper from '../components/layout/PageHeaderWrapper'

export default function HomePage() {
  const { todos } = useSelector((state) => state.todo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <PageWrapper>
      <PageHeaderWrapper title="ALL TODO'S" />
      {todos && <TodoList todos={todos} />}
    </PageWrapper>
  )
}
