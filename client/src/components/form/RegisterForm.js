import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addUser } from '../../store/user-actions'
import useInput from '../../hooks/use-input'
import register from '../../utils/formFields'

import { TextField } from '@mui/material'
import SubmitButton from '../button/SumbitButton'
import FormBox from './FormBox'

export default function RegisterForm() {
  const [formIsValid, setFormIsValid] = useState(false)
  const dispatch = useDispatch()

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
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    const data = {
      fullName: fullNameInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }
    dispatch(addUser(data))
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
