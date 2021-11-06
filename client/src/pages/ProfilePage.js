import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import register from '../utils/formFields'
import useInput from '../hooks/use-input'
import { Box, Container, Typography, Grid, TextField } from '@mui/material'
import ProfileCard from '../components/card/ProfileCard'
import { updateUser } from '../store/user-actions'

export default function ProfilePage() {
  const user = useSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const fullNameInput = useInput(register.fullName.validate, user.fullName)
  const usernameInput = useInput(register.username.validate, user.username)

  const dispatch = useDispatch()

  const registered = new Date(user.createdAt).toLocaleDateString(
    'en-GB',
    'YY-MM-DD'
  )

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleOnSave = async () => {
    if (!formIsValid) return
    const data = {
      _id: user.userId,
      fullName: fullNameInput.value,
      username: usernameInput.value,
    }
    const res = await dispatch(updateUser(data))
    if (!res.error) {
      toggleEdit()
    }
  }

  useEffect(() => {
    setFormIsValid(fullNameInput.isValid && usernameInput.isValid)
  }, [fullNameInput.isValid, usernameInput.isValid])

  return (
    <Container sx={{ width: '60vw', height: '60vh', mx: 'auto', my: 'auto' }}>
      <ProfileCard
        title="My Profile"
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        submitHandler={handleOnSave}
      >
        <Box sx={{ p: 5, height: '100%' }}>
          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={4} sm={4} lg={4} sx={{ height: '4ch' }}>
              <Typography
                sx={{
                  p: 0,
                  m: 0,
                  fontWeight: 'bold',
                }}
              >
                Name:
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8} lg={8} sx={{ height: '4ch' }}>
              {isEditing ? (
                <TextField
                  variant="standard"
                  sx={{
                    input: { paddingTop: 0, color: 'gray', width: '23ch' },
                  }}
                  name={register.fullName.name}
                  value={fullNameInput.value}
                  onChange={fullNameInput.onChange}
                  onBlur={fullNameInput.onBlur}
                />
              ) : (
                <Typography>{user.fullName}</Typography>
              )}
            </Grid>
            <Grid item xs={4} sm={4} lg={4} sx={{ height: '4ch' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Username:</Typography>
            </Grid>
            <Grid item xs={8} sm={8} lg={8} sx={{ height: '4ch' }}>
              {isEditing ? (
                <TextField
                  variant="standard"
                  sx={{
                    input: { paddingTop: 0, color: 'gray', width: '23ch' },
                  }}
                  name={register.username.name}
                  value={usernameInput.value}
                  onChange={usernameInput.onChange}
                  onBlur={usernameInput.onBlur}
                />
              ) : (
                <Typography>{user.username}</Typography>
              )}
            </Grid>
            <Grid item xs={4} sm={4} lg={4} sx={{ height: '4ch' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Email:</Typography>
            </Grid>
            <Grid item xs={8} sm={8} lg={8} sx={{ height: '4ch' }}>
              <Typography>{user.email}</Typography>
            </Grid>
            <Grid item xs={4} sm={4} lg={4} sx={{ height: '4ch' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Member since:</Typography>
            </Grid>
            <Grid item xs={8} sm={8} lg={8} sx={{ height: '4ch' }}>
              <Typography>{registered}</Typography>
            </Grid>
          </Grid>
        </Box>
      </ProfileCard>
    </Container>
  )
}
