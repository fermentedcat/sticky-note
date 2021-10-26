import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from '../store/todo-actions'

import Modal from '../components/layout/Modal'
import TodoForm from '../components/form/TodoForm'
import TodoList from '../components/todo/TodoList'
import IconButton from '../components/button/IconButton'

export default function StackPage() {
  const [showModal, setShowModal] = useState(false)
  const { stack, todos, error } = useSelector((state) => state.todo)
  const { slug } = useParams()
  const dispatch = useDispatch()

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    dispatch(fetchTodos(`stack/${slug}`))
  }, [dispatch, slug])

  useEffect(() => {
    // TODO: dispatch notification
    console.log(error)
  }, [error])

  // TODO: Sort by lastEdit
  // const dateOrderedTodoList = []

  let title = ''
  if (stack) title = stack.title.toUpperCase()

  return (
    <>
      <IconButton
        type="add"
        fixed
        active
        bottomDescr
        description="add new todo"
        onClick={toggleShowModal}
      />
      {todos && <TodoList todos={todos} title={title} />}
      <Modal open={showModal} onClose={toggleShowModal} title="Add todo">
        {stack && <TodoForm stackId={stack._id} closeForm={toggleShowModal} />}
      </Modal>
    </>
  )
}
