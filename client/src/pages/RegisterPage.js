import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'

import { addNewUser } from '../api/user'

export default function RegisterPage() {
  const [userInput, setUserInput] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  })

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(userInput)
    const response = await addNewUser(userInput)
    console.log(response);
  }

  const inputChangeHandler = (e) => {
    setUserInput(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

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
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            name="fullName"
            placeholder="Your Name"
            onChange={inputChangeHandler}
            multiline
          />
          <TextField
            required
            id="outlined-required"
            label="Username"
            name="username"
            placeholder="your_username"
            onChange={inputChangeHandler}
            multiline
            />
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            name="email"
            placeholder="you@mail.com"
            onChange={inputChangeHandler}
            multiline
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            helperText="6 characters minimum"
            onChange={inputChangeHandler}
          />
        </div>
        <Button type="submit">Submit</Button>
      </Box>
      <Link to='/login'>Login</Link>
    </div>
  )
}
