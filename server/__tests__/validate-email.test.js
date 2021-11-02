/* eslint-disable indent */
/* eslint-disable no-undef */
const validate = require('../utils/validate')

describe('Testing email validator with valid emails', () => {
  const first = 'email@email.com'
  const second = '3_Ma@il.se'

  test('Verify valid email returns true', () => {
    const emailIsValid = validate.email(first)
    expect(emailIsValid).toBe(true)
  })

  test('Verify email containing _ and number returns true', () => {
    const emailIsValid = validate.email(second)
    expect(emailIsValid).toBe(true)
  })
})

describe('Testing email validator with invalid emails', () => {
  const first = 'email'
  const second = 'email@'
  const third = 'e.se@mail'
  const fourth = 'mail@se.mail@mail.se'
  const number = 123
  const emptyString = ' '
  const nullVal = null
  const undefinedVal = undefined

  test('Verify short string returns false', () => {
    const emailIsValid = validate.email(first)
    expect(emailIsValid).toBe(false)
  })

  test('Verify short string of numbers returns false', () => {
    const emailIsValid = validate.email(second)
    expect(emailIsValid).toBe(false)
  })

  test('Verify short string returns false', () => {
    const emailIsValid = validate.email(third)
    expect(emailIsValid).toBe(false)
  })

  test('Verify short string of numbers returns false', () => {
    const emailIsValid = validate.email(fourth)
    expect(emailIsValid).toBe(false)
  })

  test('Verify number returns false', () => {
    const emailIsValid = validate.email(number)
    expect(emailIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const emailIsValid = validate.email(emptyString)
    expect(emailIsValid).toBe(false)
  })

  test('Verify null returns false', () => {
    const emailIsValid = validate.email(nullVal)
    expect(emailIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const emailIsValid = validate.email(undefinedVal)
    expect(emailIsValid).toBe(false)
  })
})
