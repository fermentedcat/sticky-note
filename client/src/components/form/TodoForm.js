import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useInput from '../../hooks/use-input'
import { todo } from '../../utils/formFields'
import { addTodo, updateTodo } from '../../store/todo-actions'

import { TextField } from '@mui/material'
import FormBox from './FormBox'
import TodoCard from '../card/TodoCard'
import { uiActions } from '../../store/ui-slice'

// new todo - receives stackId
// edit todo - receives todoItem
export default function TodoForm({
  stackId,
  todoItem = {},
  exitEditMode,
  onClose,
}) {
  const [formIsValid, setFormIsValid] = useState(false)
  const dispatch = useDispatch()
  if (!stackId) stackId = todo.stack

  const titleInitVal = todoItem.title || todo.title.initialValue
  const markdownInitVal = todoItem.markdown || todo.markdown.initialValue

  const titleInput = useInput(todo.title.validate, titleInitVal)
  const markdownInput = useInput(todo.markdown.validate, markdownInitVal)

  const handleSubmitTodo = async () => {
    if (!formIsValid) {
      return
    }
    const data = {
      stack: stackId,
      title: titleInput.value,
      markdown: markdownInput.value,
    }
    // edit existing or add new todo
    if (todoItem._id) {
      await dispatch(updateTodo({ ...data, _id: todoItem._id }))
      exitEditMode()
      return
    }
    await dispatch(addTodo(data))
    dispatch(uiActions.closeModal())
  }

  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])

  return (
    <TodoCard
      onClose={onClose}
      title={todoItem.title ? `Edit ${todoItem.title}` : 'Add Todo'}
      isEditing={todoItem.title}
      exitEditMode={exitEditMode}
      submitHandler={handleSubmitTodo}
      itemExists={todoItem.title}
    >
      <FormBox onSubmit={handleSubmitTodo}>
        <TextField
          type={todo.title.type}
          name={todo.title.name}
          value={titleInput.value}
          onChange={titleInput.onChange}
          onBlur={titleInput.onBlur}
          label={todo.title.label}
          required={todo.title.required}
        />
        <TextField
          type={todo.markdown.type}
          name={todo.markdown.name}
          value={markdownInput.value}
          onChange={markdownInput.onChange}
          onBlur={markdownInput.onBlur}
          label={todo.markdown.label}
          required={todo.markdown.required}
          multiline
          rows={16}
          sx={{ flexGrow: 1 }}
        />
      </FormBox>
    </TodoCard>
  )
}
