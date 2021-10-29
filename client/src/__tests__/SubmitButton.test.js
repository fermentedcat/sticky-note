/* eslint-disable indent */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { React } from 'react'
import '@testing-library/jest-dom'
import SubmitButton from '../components/button/SumbitButton'

test('That SubmitButton renters a button with prop title', () => {
  render(<SubmitButton title="Submit" />)
  const submitButton = screen.getByText('Submit')
  expect(submitButton).toBeInTheDocument()
})
