/* eslint-disable indent */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { React } from 'react'
import '@testing-library/jest-dom'
import Card from '../components/card/Card'

test('useInput hook returns isValid = false if empty string', () => {
  render(
    <Card title="Header">
      <p>Hello World</p>
    </Card>
  )
  const title = screen.getByText('Header')
  expect(title).toBeInTheDocument()
  const child = screen.getByText('Hello World')
  expect(child).toBeInTheDocument()
})
