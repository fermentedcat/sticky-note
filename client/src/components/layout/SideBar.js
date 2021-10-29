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
      backgroundColor: 'rgba(255, 191, 209, 0.11)',
      boxShadow: '0px 3px 12px -6px rgba(50,30,10,0.15)',
    },
  },
}))

const Item = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 6px 12px -6px rgba(50,30,10,0.15)',
  backgroundColor: 'rgb(255,255,249)',
  color: theme.palette.text.secondary,
  width: '100%',
  '&:hover': {
    backgroundColor: 'rgba(255, 191, 209, 0.11)',
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
        paddingTop: 10,
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
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
        >
          YOUR STACKS
        </Typography>
        <Button onClick={handleShowModal}>Add Stack</Button>

        <Grid
          container
          direction="column"
          spacing={{ xs: 1, md: 2 }}
          padding={2}
        >
          <Link component={NavLink} to="/todo/pinned" item xs={2} sm={4} md={4}>
            <Item>Pinned</Item>
          </Link>

          {stacks &&
            stacks.map((stack) => {
              return (
                <Link
                  key={stack._id}
                  component={NavLink}
                  to={`/stack/${stack.slug}`}
                  item
                  xs={2}
                  sm={4}
                  md={4}
                >
                  <Item>{stack.title}</Item>
                </Link>
              )
            })}

          <Link component={NavLink} to="/todo/all" item xs={2} sm={4} md={4}>
            <Item>All todo lists</Item>
          </Link>
        </Grid>
      </Box>
    </Grid>
  )
}
