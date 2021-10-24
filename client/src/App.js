import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { authenticateUser } from './store/user-actions'
import { todoActions } from './store/todo-slice'
import { stackActions } from './store/stack-slice'

import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import Header from './components/layout/Header'
import SideBar from './components/layout/SideBar'
import { Grid, Box } from '@mui/material'
import StackPage from './pages/StackPage'

import Api from './api/api'
export const api = new Api()

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(authenticateUser())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticated) {
      // clean up redux store and url on logout
      history.push('/')
      dispatch(todoActions.clearTodos())
      dispatch(stackActions.clearStacks())
    }
  }, [dispatch, isAuthenticated, history])

  return (
    <div
      style={{
        margin: 0,
        width: '100vw',
        backgroundColor: 'rgb(255,255,240)',
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            margin: 0,
            padding: 2,
            height: '100vh',
            width: '100%',
            columnGap: 2,
          }}
        >
          {isAuthenticated && <SideBar />}

          <Switch>
            <Route path="/" exact>
              {isAuthenticated ? <HomePage /> : <LandingPage />}
            </Route>
            <Route path="/stack/:slug" exact>
              {isAuthenticated ? <StackPage /> : <LandingPage />}
            </Route>
          </Switch>
        </Grid>
      </Box>
    </div>
  )
}

export default App
