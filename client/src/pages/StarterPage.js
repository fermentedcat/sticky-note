import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Box, Container, Typography } from '@mui/material'
import LogoCard from '../components/layout/LogoCard'
import Footer from '../components/layout/Footer'
import { useDispatch } from 'react-redux'
import { uiActions } from '../store/ui-slice'

export default function StarterPage() {
  const dispatch = useDispatch()

  const handleOpenStackModal = () => {
    dispatch(uiActions.setModal({ type: 'add_stack' }))
  }

  return (
    <Container
      sx={{
        width: 'fit-content',
        height: '40vh',
        mx: 'auto',
        my: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          width: '40ch',
          maxWidth: '40vw',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="p"
            sx={{
              p: 1,
              m: 0,
              fontWeight: 'bold',
            }}
          >
            Welcome to Sticky Note!
          </Typography>
          <Typography
            variant="p"
            sx={{
              p: 1,
              m: 0,
            }}
          >
            Create a stack for your first todo lists to get started.
          </Typography>
          <Button
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleOpenStackModal}
          >
            Add stack
          </Button>
        </Box>
        <Typography variant="p" sx={{ p: 1, mt: '5vh' }}>
          If you get stuck at any time, go to the{' '}
          <a component={Link} to="/about">
            About
          </a>{' '}
          section for instructions.
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            my: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <LogoCard size="sm" />
          <Typography
            variant="h6"
            sx={{
              p: 0,
              pb: 5,
              m: 0,
              fontWeight: 'bold',
            }}
          >
            STICKY NOTE
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Container>
  )
}
