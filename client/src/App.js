import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { authenticate } from './store/auth-slice'

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
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
    </Switch>
  );
}

export default App;
