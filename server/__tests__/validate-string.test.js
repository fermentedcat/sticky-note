/* eslint-disable indent */
/* eslint-disable no-undef */
const validate = require('../utils/validate')

describe('Testing string validator', () => {
  const string = 'Hello'
  const stringNumber = '123'
  const number = 123
  const emptyString = ' '
  const nullVal = null
  const undefinedVal = undefined

  test('Verify string returns true', () => {
    const stringIsValid = validate.string(string)
    expect(stringIsValid).toBe(true)
  })

  test('Verify string of numbers returns true', () => {
    const stringNumberIsValid = validate.string(stringNumber)
    expect(stringNumberIsValid).toBe(true)
  })

  test('Verify number returns false', () => {
    const numberIsValid = validate.string(number)
    expect(numberIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const emptyStringIsValid = validate.string(emptyString)
    expect(emptyStringIsValid).toBe(false)
  })

  test('Verify null returns false', () => {
    const nullValIsValid = validate.string(nullVal)
    expect(nullValIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const undefinedValIsValid = validate.string(undefinedVal)
    expect(undefinedValIsValid).toBe(false)
  })
})
