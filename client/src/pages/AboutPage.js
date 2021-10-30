import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material'

export default function AboutPage() {
  return (
    <Box sx={{ my: 'auto' }}>
      This is your favorite todo app.
      <Button component={Link} to="/login">
        Login or register an account!
      </Button>
    </Box>
  )
}
