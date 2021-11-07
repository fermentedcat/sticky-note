import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from '../store/todo-actions'
import { uiActions } from '../store/ui-slice'
import { todoActions } from '../store/todo-slice'

import { Box, Typography, Button } from '@mui/material'
import TodoList from '../components/todo/TodoList'
import PageWrapper from '../components/layout/PageWrapper'
import PageHeaderWrapper from '../components/layout/PageHeaderWrapper'

export default function StackPage() {
  const { stack, todos, accesses } = useSelector((state) => state.todo)
  const { slug } = useParams()
  const dispatch = useDispatch()

  const toggleShowModal = () => {
    dispatch(
      uiActions.setModal({ type: 'add_todo', props: { stackId: stack._id } })
    )
  }

  const handleOpenEditStack = () => {
    dispatch(uiActions.setModal({ type: 'edit_stack' }))
  }

  useEffect(() => {
    dispatch(fetchTodos(`stack/${slug}`))
  }, [dispatch, slug])

  useEffect(() => {
    return () => {
      // clear state on unmount to prevent lagging data on next mount
      dispatch(todoActions.clearTodos())
    }
  }, [dispatch])

  const title = stack ? stack.title.toUpperCase() : ''
  const description = stack ? stack.description : ''

  return (
    <PageWrapper>
      <PageHeaderWrapper title={title} description={description}>
        {accesses && stack && (
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{
                marginLeft: 2,
                fontSize: '14px',
                color: 'rgb(25, 118, 210)',
              }}
            >
              <b>Collaborators:</b> {stack.owner && stack.owner.username}{' '}
              (owner)
              {accesses.length > 0 && ', '}
              {accesses.map((access, index) => {
                if (accesses.length > 1 && index !== accesses.length - 1) {
                  return access.user.username + ', '
                }
                return access.user.username
              })}
            </Typography>
          </Box>
        )}
        <Box>
          <Button onClick={handleOpenEditStack}>Edit Stack</Button>
          <Button onClick={toggleShowModal}>Add todo</Button>
        </Box>
      </PageHeaderWrapper>

      {todos && <TodoList todos={todos} />}
    </PageWrapper>
  )
}
