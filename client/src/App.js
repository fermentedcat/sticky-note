import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from './store/ui-slice'
import { authenticateUser, fetchCurrentUser } from './store/user-actions'

import Div100vh from 'react-div-100vh'
import { Grid, Snackbar, Alert, createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/system'
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

const customTheme = createTheme({
  palette: {
    secondary: {
      main: '#ffbfd1',
    },
  },
})

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
    <ThemeProvider theme={customTheme}>
      <Div100vh>
        <Grid
          sx={{
            margin: 0,
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            width: '100vw',
            backgroundColor: 'rgb(255,255,240)',
          }}
        >
          <Header />
          <Grid
            id="contentWrapper"
            item
            container
            justifyContent="space-between"
            sx={{
              flexGrow: 1,
              margin: 0,
              // marginTop: '80px',
              padding: 2,
              paddingTop: 0,
              overflow: 'hidden',
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
              <ProtectedRoute
                path="/todo/all"
                sideBar
                component={AllTodosPage}
              />
              <ProtectedRoute path="/start" component={StarterPage} />
              <ProtectedRoute path="/" sideBar />
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
        </Grid>
      </Div100vh>
    </ThemeProvider>
  )
}

export default App
