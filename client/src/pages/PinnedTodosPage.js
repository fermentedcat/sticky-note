import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPinned } from '../store/user-actions'
import TodoList from '../components/todo/TodoList'
import PageWrapper from '../components/layout/PageWrapper'
import PageHeaderWrapper from '../components/layout/PageHeaderWrapper'

export default function HomePage() {
  const { todos } = useSelector((state) => state.todo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPinned())
  }, [dispatch])

  return (
    <PageWrapper>
      <PageHeaderWrapper title="PINNED TODO'S"></PageHeaderWrapper>
      {todos && <TodoList todos={todos} />}
    </PageWrapper>
  )
}
