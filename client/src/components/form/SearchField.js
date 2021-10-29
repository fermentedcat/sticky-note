import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import validate from '../../utils/validate'
import { SearchResultList } from './SearchResultList'
import useInput from '../../hooks/use-input'
import { searchUsers } from '../../store/user-actions'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  display: 'inline-flex',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const SearchField = () => {
  const input = useInput(validate.string)
  const [result, setResult] = useState([])
  const dispatch = useDispatch()

  const inputProps = {
    name: 'search',
    value: input.value,
    onChange: input.onChange,
  }

  useEffect(() => {
    if (input.isValid) {
      const timer = setTimeout(async () => {
        try {
          const response = await dispatch(searchUsers(input.value))
          setResult(response.payload)
        } catch (error) {
          // also if no results on query (404)
          setResult([])
        }
      }, 600)
      return () => {
        clearTimeout(timer)
      }
    }
    setResult([])
  }, [input.value, input.isValid])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        autoComplete="off"
        placeholder="Search users..."
        inputProps={{ 'aria-label': 'search' }}
        {...inputProps}
      />
      {result.length > 0 && (
        <SearchResultList result={result} reset={input.reset} />
      )}
    </Search>
  )
}
