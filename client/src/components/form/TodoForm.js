import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useInput from '../../hooks/use-input'
import { todo } from '../../utils/formFields'
import { addTodo, updateTodo } from '../../store/todo-actions'

import { TextField } from '@mui/material'
import SubmitButton from '../button/SumbitButton'
import FormBox from './FormBox'

// new todo - props = { stackId } 
// edit todo - props = { todo } 
export default function TodoForm({stackId, todoItem = {}, closeForm}) {
  const [formIsValid, setFormIsValid] = useState(false)
  const dispatch = useDispatch()
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
    // edit existing or add new todo
    if (todoItem._id) {
      dispatch(updateTodo({...data, _id: todoItem._id}))
      closeForm()
      return;
    }
    dispatch(addTodo(data)) 
    closeForm()
  }

  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])

  return (
    <FormBox onSubmit={handleSubmitTodo}>
      {inputFields}
      <SubmitButton title="Save" />
    </FormBox>
  )
}
