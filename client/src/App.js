import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

// import { authenticateUser } from './store/user-actions'
import { todoActions } from './store/todo-slice'
import { stackActions } from './store/stack-slice'

import { Grid, Box } from '@mui/material'
import Header from './components/layout/Header'
import SideBar from './components/layout/SideBar'
// import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import StackPage from './pages/StackPage'
import PinnedTodosPage from './pages/PinnedTodosPage'
import AllTodosPage from './pages/AllTodosPage'

import Api from './api/api'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
export const api = new Api()

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!isAuthenticated) {
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
            <Route path="/login" component={LandingPage} />
            <ProtectedRoute path="/stack/:slug" component={StackPage} />
            <ProtectedRoute
              path="/todo/pinned"
              exact
              component={PinnedTodosPage}
            />
            <ProtectedRoute path="/todo/all" exact component={AllTodosPage} />
            <ProtectedRoute path="/" exact component={PinnedTodosPage} />
          </Switch>
        </Grid>
      </Box>
    </div>
  )
}

export default App
