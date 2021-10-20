import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useInput from '../../hooks/use-input'
import useApi from '../../hooks/use-api'
import { authActions } from '../../store/auth-slice'

import { TextField } from '@mui/material'

import { login } from '../../utils/formFields'

import FormBox from './FormBox'
import SubmitButton from '../button/SumbitButton'
import { useHistory } from 'react-router'

export default function LoginForm() {
  const [formIsValid, setFormIsValid] = useState(false)
  const { data: token, error, callPost: requestLogin } = useApi();
  const emailInput = useInput(login.loginName.validate)
  const passwordInput = useInput(login.password.validate)
  const history = useHistory();

  const dispatch = useDispatch();

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

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    } else {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      }
      requestLogin(data, 'user/login')
    }
  }

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid)
  }, [emailInput.isValid, passwordInput.isValid])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('TODO_TOKEN', token)
      dispatch(authActions.login(token))
      history.push('/')
    }
    if (error) {
      // dispatch(usiActions.setNotification(error))
      console.log(error)
    }
  }, [token, error, dispatch]);

  return (
    <FormBox onSubmit={handleLogin}>
      {inputFields}
      <SubmitButton title="Login"/>
    </FormBox>
  )
}
