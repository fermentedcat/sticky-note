import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/use-api'
import useInput from '../../hooks/use-input'
import { todo } from '../../utils/formFields'
import SubmitButton from '../button/SumbitButton'
import FormBox from './FormBox'

// new todo - props = { stackId } 
// edit todo - props = { todo } 
export default function TodoForm({stackId, todoItem = {}}) {
  const { data, error, callPost } = useApi()
  const [formIsValid, setFormIsValid] = useState(false)
  if (!stackId) stackId = todo.stack

  const titleInitVal = todoItem.title || todo.title.initialValue
  const descrInitVal = todoItem.description || todo.description.initialValue
  const markdownInitVal = todoItem.markdown || todo.markdown.initialValue

  const titleInput = useInput(todo.title.validate, titleInitVal)
  const descrInput = useInput(todo.description.validate, descrInitVal)
  const markdownInput = useInput(todo.markdown.validate, markdownInitVal)

  const inputs = [
    { ...titleInput, ...todo.title },
    { ...descrInput, ...todo.description },
    { ...markdownInput, ...todo.markdown },
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

  const handleSubmitTodo = async (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    const data = {
      stack: stackId,
      title: titleInput.value,
      description: descrInput.value,
      markdown: markdownInput.value,
    }
    // post new or edit existing
    if (todoItem._id) {
      callPost(data, `todo/${todoItem._id}`)
      return;
    }
    callPost(data, 'todo') 
  }

  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])

  useEffect(() => {
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
  }, [data, error])

  return (
    <FormBox onSubmit={handleSubmitTodo}>
      {inputFields}
      <SubmitButton title="Save" />
    </FormBox>
  )
}
