import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStacks } from '../../store/stack-actions'

import { Grid, Box, Paper, Typography, Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import { uiActions } from '../../store/ui-slice'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  border: '1px dotted #ffbfd1',
  boxShadow: '0px 6px 12px -6px rgba(50,30,10,0.15)',
  backgroundColor: 'rgb(255,255,249)',
  color: theme.palette.text.secondary,
}))

export default function SideBar() {
  const { stacks, error } = useSelector((state) => state.stack)
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
        {error && (
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: '14px', marginTop: 3, color: 'rgb(25, 118, 210)' }}
          >
            {error}
          </Typography>
        )}

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
          <Grid component={Link} to="/todo/pinned" item xs={2} sm={4} md={4}>
            <Item>Pinned</Item>
          </Grid>

          {stacks &&
            stacks.map((stack) => {
              return (
                <Grid
                  key={stack._id}
                  component={Link}
                  to={`/stack/${stack.slug}`}
                  item
                  xs={2}
                  sm={4}
                  md={4}
                >
                  <Item>{stack.title}</Item>
                </Grid>
              )
            })}

          <Grid component={Link} to="/todo/all" item xs={2} sm={4} md={4}>
            <Item>All todo lists</Item>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
