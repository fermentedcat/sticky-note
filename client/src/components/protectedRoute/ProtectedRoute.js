import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../../store/user-actions'

export default function ProtectedRoute({
  component: Component,
  ...restOfProps
}) {
  const { isAuthenticated, loading } = useSelector((state) => state.user)
  const [dispatched, setDispatched] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticateUser())
    setDispatched(true)
  }, [dispatch])

  const finished = !loading && dispatched

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        finished && !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
