import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStacks } from '../../store/stack-actions'

import { Grid, Box, Typography, Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import { uiActions } from '../../store/ui-slice'

const Link = styled(Grid)(({ theme }) => ({
  '&.active': {
    button: {
      backgroundColor: 'rgba(255, 191, 209, 0.20)',
      boxShadow: '0px 3px 12px -6px rgba(50,30,10,0.15)',
      border: 'solid 1px rgba(255, 191, 209, 0.05)',
      span: {
        color: '#ffbfd1',
        fontWeight: 'bold',
      },
    },
  },
}))

const Item = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  border: '1px dashed rgb(255,255,249)',
  boxShadow: '0px 6px 16px -6px rgba(50,30,10,0.15)',
  backgroundColor: 'rgb(255,255,249)',
  color: '#ffbfd1',
  width: '100%',
  transition: 'all .3s ease-in-out',
  '.MuiTypography-root': {
    color: 'rgba(25, 118, 210, 0.8)',
  },
  '&:hover': {
    backgroundColor: 'rgb(255,255,249)',
    border: '1px dashed rgba(255, 191, 209, 0.50)',
  },
  '&:active': {
    backgroundColor: 'rgba(255, 191, 209, 0.41)',
    border: 'solid 1px rgba(255, 191, 209, 0.05)',
  },
}))

export default function SideBar() {
  const { stacks } = useSelector((state) => state.stack)
  const dispatch = useDispatch()

  const handleShowModal = () => {
    dispatch(uiActions.setModal({ type: 'add_stack' }))
  }

  useEffect(() => {
    dispatch(fetchStacks())
  }, [dispatch])

  return (
    <Grid
      item
      xs={2}
      sx={{
        height: '100%',
        minWidth: '240px',
        boxShadow: '-2px 0px 19px 0px rgba(255,191,209,0.34)',
        paddingTop: 14,
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
          width: '0.25em',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ffbfd173',
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            padding: 2,
            baddingBottom: 0,
            boxSizing: 'border-box',
            width: '100%',
            height: '2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ borderBottom: '1px solid rgb(25, 118, 210)' }}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'rgb(25, 118, 210)',
              }}
            >
              MY TODO&apos;S
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          direction="column"
          spacing={{ xs: 1, md: 2 }}
          padding={2}
        >
          <Link component={NavLink} to="/todo/pinned" item xs={2} sm={4} md={4}>
            <Item color="secondary">
              <Typography variant="p">Pinned</Typography>
            </Item>
          </Link>
          <Link component={NavLink} to="/todo/all" item xs={2} sm={4} md={4}>
            <Item color="secondary">
              <Typography variant="p">All todo&apos;s</Typography>
            </Item>
          </Link>
        </Grid>
        <Box
          sx={{
            padding: 2,
            boxSizing: 'border-box',
            width: '100%',
            height: '2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ borderBottom: '1px solid rgb(25, 118, 210)' }}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              sx={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'rgb(25, 118, 210)',
              }}
            >
              STACKS
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          direction="column"
          spacing={{ xs: 1, md: 2 }}
          padding={2}
        >
          {stacks &&
            stacks.map((stack) => {
              return (
                <Link
                  key={stack._id}
                  component={NavLink}
                  to={`/todo/stack/${stack.slug}`}
                  item
                  xs={2}
                  sm={4}
                  md={4}
                >
                  <Item color="secondary">
                    <Typography variant="p">{stack.title}</Typography>
                  </Item>
                </Link>
              )
            })}
        </Grid>
        <Box
          sx={{
            padding: 2,
            boxSizing: 'border-box',
            width: '100%',
            height: '2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button onClick={handleShowModal}>Add Stack</Button>
        </Box>
      </Box>
    </Grid>
  )
}
