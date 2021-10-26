import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { todoActions } from './store/todo-slice'
import { stackActions } from './store/stack-slice'
import { uiActions } from './store/ui-slice'

import { Grid, Box, Snackbar, Alert } from '@mui/material'
import Header from './components/layout/Header'
import SideBar from './components/layout/SideBar'
// import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import StackPage from './pages/StackPage'
import PinnedTodosPage from './pages/PinnedTodosPage'
import AllTodosPage from './pages/AllTodosPage'
import Modal from './components/layout/Modal'

import Api from './api/api'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { ModalContent } from './components/layout/ModalContent'
export const api = new Api()

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const { modal, notification } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(todoActions.clearTodos())
      dispatch(stackActions.clearStacks())
    }
  }, [dispatch, isAuthenticated])

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
        <Snackbar
          open={notification.show}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => dispatch(uiActions.closeNotification())}
        >
          <Alert
            onClose={() => dispatch(uiActions.closeNotification())}
            severity={notification.type || 'info'}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
        <Modal
          open={modal.show}
          onClose={() => dispatch(uiActions.closeModal())}
        >
          <ModalContent
            {...modal.props}
            modal={modal}
            onClose={() => dispatch(uiActions.closeModal())}
          />
        </Modal>
      </Box>
    </div>
  )
}

export default App
