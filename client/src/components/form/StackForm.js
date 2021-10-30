import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addStack, deleteStack, updateStack } from '../../store/stack-actions'
import useInput from '../../hooks/use-input'
import { stack } from '../../utils/formFields'

import FormBox from './FormBox'
import { Button, TextField, Box } from '@mui/material'
import { useHistory } from 'react-router'
import { SearchField } from './SearchField'
import Card from '../card/Card'

export default function StackForm({ edit, closeForm }) {
  const [formIsValid, setFormIsValid] = useState(false)
  const { stack: currentStack } = useSelector((state) => state.todo)
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
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    const data = {
      title: titleInput.value,
      description: descrInput.value,
    }
    // edit existing or add new todo
    if (edit) {
      const response = await dispatch(
        updateStack({ ...data, _id: currentStack._id })
      )
      // update url with new slug
      const newSlug = response.payload.slug
      history.push(`/stack/${newSlug}`)
      closeForm()
      return
    }
    dispatch(addStack(data))
    closeForm()
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
      console.log(response.meta.requestStatus)
      history.push('/todo/all')
      closeForm()
    }
  }

  useEffect(() => {
    setFormIsValid(titleInput.isValid)
  }, [titleInput.isValid])

  return (
    <Card title={edit ? 'Edit stack' : 'Add stack'}>
      <FormBox onSubmit={handleSubmitStack}>
        {inputFields}
        <SearchField />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Save</Button>
          {edit && <Button onClick={handleDeleteStack}>Delete</Button>}
        </Box>
      </FormBox>
    </Card>
  )
}
