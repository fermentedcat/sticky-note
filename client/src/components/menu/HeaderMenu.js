import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'

import { userActions } from '../../store/user-slice'
import { todoActions } from '../../store/todo-slice'
import { stackActions } from '../../store/stack-slice'
import { Box, Button } from '@mui/material'

const btnStyles = {
  '&.active': {
    textDecoration: 'underline',
    textUnderlineOffset: 5,
  },
}

// const smallScreenOptionsStyles = {
//   position: 'relative',
//   flexDirection: 'column',
//   top: 5,
//   right: 5,
// }

export default function HeaderMenu() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('TODO_TOKEN')
    dispatch(userActions.logout())
    dispatch(todoActions.clearTodos())
    dispatch(stackActions.clearStacks())
    history.push('/login')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginRight: 3,
        }}
      >
        {isAuthenticated && (
          <>
            <Button sx={btnStyles} component={NavLink} to="/todo">
              My Todo&apos;s
            </Button>
            <Button sx={btnStyles} component={NavLink} to="/profile">
              My Profile
            </Button>
          </>
        )}
        <Button sx={btnStyles} component={NavLink} to="/about">
          About
        </Button>
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button sx={btnStyles} component={NavLink} to="/login">
            Login / Register
          </Button>
        )}
      </Box>
    </Box>
  )
}
