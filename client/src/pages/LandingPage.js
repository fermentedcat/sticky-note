import React, { useState } from 'react'
import { Button, Box, Container } from '@mui/material'
import LoginForm from '../components/form/LoginForm'
import RegisterForm from '../components/form/RegisterForm'

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(true)

  const setLogin = () => {
    setShowLogin(true)
  }
  const setRegister = () => {
    setShowLogin(false)
  }

  return (
    <Container>
      <Box sx={{ mx: 'auto', maxWidth: 'fit-content', textAlign: 'center' }}>
        <h1>STICKY NOTE</h1>
        <h3>your favorite todo app</h3>
        {showLogin ? <LoginForm /> : <RegisterForm />}
        {!showLogin && <Button onClick={setLogin}>Login</Button>}
        {showLogin && <Button onClick={setRegister}>Register</Button>}
      </Box>
    </Container>
  )
}
