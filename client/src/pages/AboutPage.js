import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box, Container, Typography } from '@mui/material'
import LogoCard from '../components/layout/LogoCard'
import { useSelector } from 'react-redux'
import Footer from '../components/layout/Footer'

export default function AboutPage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <Container
      sx={{
        width: 'fit-content',
        height: '60vh',
        mx: 'auto',
        my: 'auto',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          my: 'auto',
          mr: 4,
          display: 'flex',
          flexDirection: 'column',
          width: '60vh',
        }}
      >
        <Typography
          variant="p"
          sx={{
            p: 1,
            mt: 2,
          }}
        >
          <b>Sticky Note</b> is a todo app where your todo lists are written
          using markdown. You can use this{' '}
          <span>
            <a href="https://www.markdownguide.org/cheat-sheet/">
              Markdown Cheat Sheet
            </a>
          </span>{' '}
          for instructions.
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
            fontWeight: 'bold',
          }}
        >
          Create stacks and todo lists
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
          }}
        >
          To create a todo list, you need to first create a stack to put it in.
          Hit the Add Stack button in the sidebar to create it. You can edit it
          later.
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
          }}
        >
          Once you&apos;re in the stack, click Add Todo to create your todo
          list.
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
          }}
        >
          All of your todo lists will be shown under All Todo&apos;s. You can
          also pin a todo list to collect the ones you use often. Click the pin
          icon on the todo item and it will show up under Pinned.
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
            fontWeight: 'bold',
          }}
        >
          Collaborate with others
        </Typography>
        <Typography
          variant="p"
          sx={{
            p: 1,
            m: 0,
          }}
        >
          You can give access to another user to collaborate on a stack and the
          todo lists in it.
          <br />
          Go into the stack and hit the Edit Stack button, and you will find a
          search field. Type the name or username of the person you want to
          share the stack with, and choose the person from the list. If you
          can&apos;t find them there, you may want to ask them to register an
          account.
        </Typography>
        {!isAuthenticated && (
          <>
            <Typography
              variant="p"
              sx={{
                p: 1,
                m: 0,
              }}
            >
              You need to be logged in to use this app. Let&apos;s get started!
            </Typography>
            <Button sx={{ alignSelf: 'center' }} component={Link} to="/login">
              Login or register
            </Button>
          </>
        )}
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
