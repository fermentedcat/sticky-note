import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../utils/formFields'
import { authActions } from '../store/auth-slice'
import useInput from '../hooks/use-input'
import { loginUser } from '../api/user'

import { Box, Button, TextField } from '@mui/material'

export default function LoginPage() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [ email, password ] = login
  
  const emailInput = useInput(email.validate, email.initialValue)
  const passwordInput = useInput(password.validate, password.initialValue)

  const dispatch = useDispatch();

  // validate form each time input isValid state changes
  useEffect(() => {
    setFormIsValid(
      emailInput.isValid && 
      passwordInput.isValid
    )
  }, [
    emailInput.isValid, 
    passwordInput.isValid
  ])

  const loginHandler = async (e) => {
    e.preventDefault()
    if (!formIsValid) return
    const userInput = {
      email: emailInput.value,
      password: passwordInput.value
    }
    try {
      const user = await loginUser(userInput)
      dispatch(authActions.login(user))
    } catch (error) {
      console.log(error)
      //TODO: display error
    }
  }
    
  // combine field props from separate objects
  const inputs = [
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
      <h1>Login</h1>
      <Box
        onSubmit={loginHandler}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <div>
          {fieldsOutput}
        </div>
        <Button disabled={!formIsValid} type="submit">Login</Button>
        <Button type="button" component={Link} to='/register'>Register new account</Button>
      </Box>
    </div>
  )
}
