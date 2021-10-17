import React, { useEffect, useState } from 'react'

import useInput from '../../hooks/use-input'
import { TextField } from '@mui/material'
import register from '../../utils/formFields'
import SubmitButton from '../button/SumbitButton'
import FormBox from './FormBox'

export default function RegisterForm() {
  const [formIsValid, setFormIsValid] = useState(false)
  const fullNameInput = useInput(register.fullName.validate)
  const usernameInput = useInput(register.username.validate)
  const emailInput = useInput(register.email.validate)
  const passwordInput = useInput(register.password.validate)

  const inputs = [
    { ...fullNameInput, ...register.fullName },
    { ...usernameInput, ...register.username },
    { ...emailInput, ...register.email },
    { ...passwordInput, ...register.password },
  ]

  const inputFields = inputs.map((input, index) => {
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

  const handleRegister = async (e) => {
    e.target.preventDefault()
    if (!formIsValid) {
      return
    } else {
      const data = {
        fullName: emailInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }
      try {
        console.log(data)
      } catch (error) {
        console.log('Login failed.')
      }
    }
  }

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid)
  }, [emailInput.isValid, passwordInput.isValid])

  return (
    <FormBox onSubmit={handleRegister}>
      {inputFields}
      <SubmitButton title="Register" />
    </FormBox>
  )
}