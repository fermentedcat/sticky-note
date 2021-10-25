import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Box, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import LoginForm from '../components/form/LoginForm'
import RegisterForm from '../components/form/RegisterForm'
import LandingLogo from '../components/layout/LandingLogo'

export default function LandingPage() {
  const { isAuthenticated } = useSelector((state) => state.user)
  const [formType, setformType] = useState('Login')
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated])

  const setLogin = () => {
    setformType('Login')
  }
  const setRegister = () => {
    setformType('Register')
  }

  return (
    <Container
      sx={{
        mx: 'auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '85%',
          mx: 'auto',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          height: 400,
        }}
      >
        <LandingLogo />
        <Box sx={{ maxWidth: 300, textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            align="center"
            sx={{ fontWeight: 800, color: '#ffbfd1' }}
          >
            {formType}
          </Typography>
          {formType === 'Login' ? <LoginForm /> : <RegisterForm />}
          {formType !== 'Login' && <Button onClick={setLogin}>Login</Button>}
          {formType === 'Login' && (
            <Button onClick={setRegister}>Register</Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}
