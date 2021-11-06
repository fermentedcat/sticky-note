import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addStack,
  deleteStack,
  updateStack,
  removeOwnStackAccess,
} from '../../store/stack-actions'
import useInput from '../../hooks/use-input'
import { stack } from '../../utils/formFields'

import FormBox from './FormBox'
import { TextField, Box, Typography } from '@mui/material'
import { useHistory } from 'react-router'
import { SearchField } from './SearchField'
import TodoCard from '../card/TodoCard'

export default function StackForm({ edit, closeForm }) {
  const [formIsValid, setFormIsValid] = useState(false)
  const { stack: currentStack } = useSelector((state) => state.todo)
  const userId = useSelector((state) => state.user.userId)
  const dispatch = useDispatch()
  const history = useHistory()

  let titleInitVal = stack.title.initialValue
  let descrInitVal = stack.description.initialValue

  if (edit && stack) {
    titleInitVal = currentStack.title
    descrInitVal = currentStack.description
  }

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
    if (!formIsValid) {
      return
    }

    let newSlug
    // edit existing or add new stack
    if (edit) {
      const data = {
        description: descrInput.value,
      }
      // only update title if actually updated (increments slug otherwise)
      if (titleInput.value !== currentStack.title) {
        data.title = titleInput.value
      }
      const response = await dispatch(
        updateStack({ ...data, _id: currentStack._id })
      )
      newSlug = response.payload.slug
    } else {
      const data = {
        title: titleInput.value,
        description: descrInput.value,
      }
      const response = await dispatch(addStack(data))
      newSlug = response.payload.slug
    }
    if (newSlug) {
      // go to stack or update url with new slug
      history.push(`/todo/stack/${newSlug}`)
      closeForm()
    }
  }

  const handleDeleteStack = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this stack? This will permantntly delete all of its todo lists.'
      )
    ) {
      return
    }
    const response = await dispatch(deleteStack(currentStack._id))
    if (response.meta.requestStatus === 'fulfilled') {
      history.push('/')
      closeForm()
    }
  }

  const handleLeaveStack = async () => {
    if (
      !confirm(
        'Are you sure you want to leave this stack? Your access to its todo lists will be removed.'
      )
    ) {
      return
    }
    const response = await dispatch(removeOwnStackAccess(currentStack._id))
    if (response.meta.requestStatus === 'fulfilled') {
      history.push('/')
      closeForm()
    }
  }

  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])

  const cardProps = {
    title: edit ? 'Edit Stack' : 'Add Stack',
    submitHandler: handleSubmitStack,
  }

  if (edit) {
    cardProps.itemExists = true
    cardProps.isEditing = true
  }
  if (edit && currentStack.owner !== userId) {
    cardProps.leaveHandler = handleLeaveStack
  }
  if (edit && currentStack.owner === userId) {
    cardProps.removeHandler = handleDeleteStack
  }

  return (
    <TodoCard {...cardProps}>
      <FormBox>
        {inputFields}
        {edit && (
          <Box sx={{ p: 1 }}>
            <Typography sx={{ fontWeight: 'bold', color: '#ffbfd1' }}>
              Collaborate with others:
            </Typography>
            <SearchField />
          </Box>
        )}
      </FormBox>
    </TodoCard>
  )
}
