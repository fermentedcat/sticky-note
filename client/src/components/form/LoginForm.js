import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useInput from '../../hooks/use-input'
import { loginUser } from '../../store/user-actions'
import { login } from '../../utils/formFields'

import { TextField } from '@mui/material'
import FormBox from './FormBox'
import SubmitButton from '../button/SumbitButton'

export default function LoginForm() {
  const [formIsValid, setFormIsValid] = useState(false)
  const emailInput = useInput(login.loginName.validate)
  const passwordInput = useInput(login.password.validate)

  const dispatch = useDispatch()

  const inputs = [
    { ...emailInput, ...login.loginName },
    { ...passwordInput, ...login.password },
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

  const handleLogin = (e) => {
    e.preventDefault()
    if (formIsValid) {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      }
      dispatch(loginUser(data))
    }
  }

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid)
  }, [emailInput.isValid, passwordInput.isValid])

  return (
    <FormBox onSubmit={handleLogin}>
      {inputFields}
      <SubmitButton title="Login" />
    </FormBox>
  )
}
