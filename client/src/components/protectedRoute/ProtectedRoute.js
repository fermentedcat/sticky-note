import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../../store/user-actions'
import { CircularProgress } from '@mui/material'
import SideBar from '../layout/SideBar'

export default function ProtectedRoute({
  component: Component,
  sideBar,
  ...restOfProps
}) {
  const { isAuthenticated, loading } = useSelector((state) => state.user)
  const [dispatched, setDispatched] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authenticateUser())
      setDispatched(true)
    }
  }, [dispatch])

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (loading && dispatched) {
          return (
            <CircularProgress
              sx={{ mx: 'auto', my: 'auto', animationDuration: '550ms' }}
              disableShrink
            />
          )
        }
        if (isAuthenticated) {
          return (
            <>
              {sideBar && <SideBar />}
              <Component {...props} />
            </>
          )
        }
        if (!loading && dispatched && !isAuthenticated) {
          return <Redirect to="/login" />
        }
      }}
    />
  )
}
