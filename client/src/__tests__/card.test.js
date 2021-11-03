/* eslint-disable indent */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { React } from 'react'
import '@testing-library/jest-dom'
import Card from '../components/card/Card'

test('Test that card renders title and children', () => {
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
