import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from './store/ui-slice'
import { authenticateUser, fetchCurrentUser } from './store/user-actions'

import { Grid, Box, Snackbar, Alert } from '@mui/material'
import Header from './components/layout/Header'
import LandingPage from './pages/LandingPage'
import StackPage from './pages/StackPage'
import PinnedTodosPage from './pages/PinnedTodosPage'
import AllTodosPage from './pages/AllTodosPage'
import Modal from './components/layout/Modal'

import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { ModalContent } from './components/layout/ModalContent'

import Api from './api/api'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import StarterPage from './pages/StarterPage'
export const api = new Api()

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const { modal, notification } = useSelector((state) => state.ui)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authenticateUser())
    } else {
      dispatch(fetchCurrentUser())
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
          <Switch>
            <Route path="/login" component={LandingPage} />
            <Route path="/about" component={AboutPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            <ProtectedRoute
              path="/todo/stack/:slug"
              sideBar
              component={StackPage}
            />
            <ProtectedRoute
              path="/todo/pinned"
              sideBar
              component={PinnedTodosPage}
            />
            <ProtectedRoute path="/todo/all" sideBar component={AllTodosPage} />
            <ProtectedRoute path="/start" component={StarterPage} />
            <ProtectedRoute path="/" sideBar component={PinnedTodosPage} />
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
