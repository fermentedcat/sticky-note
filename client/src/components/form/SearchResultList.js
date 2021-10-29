import React from 'react'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import { ListItemButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addStackAccess } from '../../store/stack-actions'

const ResultList = styled(List)(() => ({
  width: '100%',
  maxWidth: 360,
  backgroundColor: 'rgb(255,255,240)',
  position: 'absolute',
  top: 44,
  borderRadius: '3px',
  border: '1px solid rgba(255, 191, 209, 0.11)',
  overflow: 'auto',
  maxHeight: 200,
  padding: 0,
  '.MuiListItemButton-root': {
    display: 'flex',
    justifyContent: 'space-between',
    opacity: '0.8',
    backgroundColor: '#rgba(255, 191, 209, 0.11)',
    fontWeight: 'bold',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    '&:hover': {
      backgroundColor: 'rgba(255, 191, 209, 0.31)',
      opacity: '1',
    },
    '&  + .MuiListItemButton-root': {
      borderTop: '1px solid rgba(255, 191, 209, 0.11)',
    },
    div: {
      display: 'flex',
    },
    'div + p': {
      visibility: 'hidden',
    },
  },
  '.MuiListItemButton-root:hover': {
    'div + p': {
      visibility: 'unset',
    },
  },
}))

export const SearchResultList = ({ result, reset }) => {
  const userId = useSelector((state) => state.user.userId)
  const stackId = useSelector((state) => state.todo.stack._id)
  const dispatch = useDispatch()

  const handleAddAccess = (id) => {
    const data = {
      stack: stackId,
      user: id,
    }
    dispatch(addStackAccess(data))
    reset()
  }

  return (
    <ResultList>
      {result.map((user) => {
        if (user._id !== userId) {
          return (
            <ListItemButton
              key={user._id}
              onClick={() => handleAddAccess(user._id)}
            >
              <div>
                <Typography>{user.username}</Typography>
                <Typography sx={{ color: 'gray', marginLeft: 1 }}>
                  {user.fullName}
                </Typography>
              </div>
              <Typography sx={{ textAlign: 'right' }}>GIVE ACCESS</Typography>
            </ListItemButton>
          )
        } else {
          return null
        }
      })}
    </ResultList>
  )
}
