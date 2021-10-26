/* eslint-disable indent */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { React } from 'react'
import '@testing-library/jest-dom'
import App from '../App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../store/index'

test('That / renders a register button', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
  const registerButton = screen.getByText(/Register/)
  expect(registerButton).toBeInTheDocument()
})
