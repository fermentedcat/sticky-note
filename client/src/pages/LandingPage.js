import React, { useState } from 'react'
import { Button, Box, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import LoginForm from '../components/form/LoginForm'
import RegisterForm from '../components/form/RegisterForm'
import Logo from '../components/layout/Logo'

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(true)

  const setLogin = () => {
    setShowLogin(true)
  }
  const setRegister = () => {
    setShowLogin(false)
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
        <Logo />
        <Box sx={{ maxWidth: 300, textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
            align="center"
            sx={{ fontWeight: 800 }}
          >
            {showLogin ? 'Login' : 'Register'}
          </Typography>
          {showLogin ? <LoginForm /> : <RegisterForm />}
          {!showLogin && <Button onClick={setLogin}>Login</Button>}
          {showLogin && <Button onClick={setRegister}>Register</Button>}
        </Box>
      </Box>
    </Container>
  )
}
