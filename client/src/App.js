import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { authenticate } from './store/auth-slice'

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  return (
    <Switch>
      <Route path="/" exact>
        {isAuthenticated ? <HomePage /> : <LandingPage />}
      </Route>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route path="/register">
        {isAuthenticated ? <Redirect to="/" /> : <RegisterPage />}
      </Route>
    </Switch>
  );
}

export default App;
