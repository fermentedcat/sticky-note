import React, { useState } from 'react'
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

const containerStyle = {
  display: 'flex',
  marginRight: 3,
  flexDirection: 'column',
  alignItems: 'flex-end',
  paddingY: 3,
}

export default function DropdownMenu() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showStacks, setShowStacks] = useState(false)

  const toggleShowStacks = () => {
    setShowStacks(!showStacks)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('TODO_TOKEN')
    dispatch(userActions.logout())
    dispatch(todoActions.clearTodos())
    dispatch(stackActions.clearStacks())
    history.push('/login')
  }
  return (
    <Box sx={containerStyle}>
      {isAuthenticated && (
        <>
          <Button sx={btnStyles} onClick={toggleShowStacks}>
            {showStacks ? 'Close' : 'My Stacks'}
          </Button>
          {!showStacks && (
            <Button sx={btnStyles} component={NavLink} to="/profile">
              My Profile
            </Button>
          )}
        </>
      )}
      {!showStacks && (
        <Button sx={btnStyles} component={NavLink} to="/about">
          About
        </Button>
      )}
      {isAuthenticated && !showStacks && (
        <Button onClick={handleLogout}>Logout</Button>
      )}
      {!isAuthenticated && !showStacks && (
        <Button sx={btnStyles} component={NavLink} to="/login">
          Login / Register
        </Button>
      )}
    </Box>
  )
}
