import React from 'react'
import { AppBar, Box, Button } from '@mui/material'
import HeaderLogo from './HeaderLogo'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth-slice'

export default function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const username = useSelector(state => state.auth.username)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('TODO_TOKEN')
    dispatch(authActions.logout())
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
          // backgroundColor: "#ffbfd1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ 
            display: "flex",
          }}>
          <HeaderLogo />
        </Box>
        <Box
          sx={{ 
            display: "flex",
            marginRight: 3
          }}>
          <Button>
            About
          </Button>
            {isAuthenticated && (
              <>
                <Button>
                  {username ? username : 'Profile'}
                </Button>
                <Button onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
        </Box>
        
      </Box>
    </AppBar>
  )
}
