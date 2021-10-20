import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addStack, updateStack } from '../../store/stack-actions'
import useInput from '../../hooks/use-input'
import { stack } from '../../utils/formFields'

import SubmitButton from '../button/SumbitButton'
import FormBox from './FormBox'
import { TextField } from '@mui/material'

export default function StackForm({ stackData = {}, closeForm }) {
  const [formIsValid, setFormIsValid] = useState(false)
  const dispatch = useDispatch()

  const titleInitVal = stackData.title || stack.title.initialValue
  const descrInitVal = stackData.description || stack.description.initialValue

  const titleInput = useInput(stack.title.validate, titleInitVal)
  const descrInput = useInput(stack.description.validate, descrInitVal)

  const inputs = [
    { ...titleInput, ...stack.title },
    { ...descrInput, ...stack.description },
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

  const handleSubmitStack = async (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    const data = {
      title: titleInput.value,
      description: descrInput.value,
    }
    // edit existing or add new todo
    if (stackData._id) {
      dispatch(updateStack({...data, _id: stackData._id}))
      closeForm()
      return;
    }
    dispatch(addStack(data)) 
    closeForm()
  }
  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])
  
  return (
    <FormBox onSubmit={handleSubmitStack}>
      {inputFields}
      <SubmitButton title="Save" />
    </FormBox>
  )
}
