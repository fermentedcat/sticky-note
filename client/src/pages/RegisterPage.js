import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addNewUser } from '../api/user'
import { authActions } from '../store/auth-slice'
import useInput from '../hooks/use-input'
import register from '../utils/formFields'

import { Box, Button, TextField } from '@mui/material'

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const [ fullName, username, email, password ] = register
  
  const fullNameInput = useInput(fullName.validate, fullName.initialValue)
  const usernameInput = useInput(username.validate, username.initialValue)
  const emailInput = useInput(email.validate, email.initialValue)
  const passwordInput = useInput(password.validate, password.initialValue)

  const registerHandler = async (e) => {
    e.preventDefault()
    if (!formIsValid) return
    const userInput = {
      fullName: fullNameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }
    try {
      const user = await addNewUser(userInput)
      dispatch(authActions.login(user))
    } catch (error) {
      console.log(error)
      //TODO: display error
    }
  }

  // validate form each time input isValid state changes
  useEffect(() => {
    setFormIsValid(
      fullNameInput.isValid && 
      usernameInput.isValid && 
      emailInput.isValid && 
      passwordInput.isValid
    )
  }, [
    fullNameInput.isValid, 
    usernameInput.isValid, 
    emailInput.isValid, 
    passwordInput.isValid
  ])
  
  // combine field props from separate objects
  const inputs = [
    { ...fullNameInput, ...fullName }, 
    { ...usernameInput, ...username }, 
    { ...emailInput, ...email }, 
    { ...passwordInput, ...password }, 
  ]

  const fieldsOutput = inputs.map((input, index) => {
    return (
      <TextField
        key={index}
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={input.label}
        required={input.required}
      />
    )
  })

  return (
    <div>
      <h1>Register</h1>
      <Box
        onSubmit={registerHandler}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <div>
          {fieldsOutput}
        </div>
        <Button disabled={!formIsValid} type="submit">Register</Button>
        <Button type="button" component={Link} to='/login'>Already signed up?</Button>
      </Box>
    </div>
  )
}
