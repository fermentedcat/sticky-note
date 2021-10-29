import React from 'react'
import { AppBar, Box, Button } from '@mui/material'
import HeaderLogo from './HeaderLogo'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/user-slice'
import { todoActions } from '../../store/todo-slice'
import { stackActions } from '../../store/stack-slice'

export default function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const username = useSelector((state) => state.user.username)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('TODO_TOKEN')
    dispatch(userActions.logout())
    dispatch(todoActions.clearTodos())
    dispatch(stackActions.clearStacks())
  }

  return (
    <AppBar
      sx={{
        boxShadow: '0px 2px 22px 5px rgba(255,191,209,0.31);',
        backgroundColor: 'rgb(255,255,240)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <HeaderLogo />
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginRight: 3,
          }}
        >
          <Button>About</Button>
          {isAuthenticated && (
            <>
              <Button>{username || 'Profile'}</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  )
}
