import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { authenticate } from './store/auth-slice'
import { todoActions } from './store/todo-slice'
import { stackActions } from './store/stack-slice'
import { api } from './store/todo-actions'

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Header from './components/layout/Header';
import SideBar from './components/layout/SideBar';
import { Grid } from '@mui/material';
import StackPage from './pages/StackPage';
import { Box } from '@mui/material';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(todoActions.clearTodos())
      dispatch(stackActions.clearStacks())
      api.reset()
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
      <Header/>  

      <Box sx={{ flexGrow: 1}}>
        <Grid 
          container 
          justifyContent="space-between"
          sx={{
            margin: 0,
            padding: 2,
            height: '100vh',
            width: '100%',
            columnGap: 2,
          }}>
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
  );
}

export default App;
