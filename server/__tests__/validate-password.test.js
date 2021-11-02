/* eslint-disable indent */
/* eslint-disable no-undef */
const validate = require('../utils/validate')

describe('Testing password validator with valid passwords', () => {
  const string = 'PassWord'
  const stringNumber = '123456'

  test('Verify string returns true', () => {
    const stringIsValid = validate.password(string)
    expect(stringIsValid).toBe(true)
  })

  test('Verify string of numbers returns true', () => {
    const stringNumberIsValid = validate.password(stringNumber)
    expect(stringNumberIsValid).toBe(true)
  })
})

describe('Testing password validator with invalid passwords', () => {
  const string = 'passw'
  const stringNumber = '12345'
  const number = 123456
  const emptyString = ' '
  const nullVal = null
  const undefinedVal = undefined

  test('Verify short string returns false', () => {
    const stringIsValid = validate.password(string)
    expect(stringIsValid).toBe(false)
  })

  test('Verify short string of numbers returns false', () => {
    const stringNumberIsValid = validate.password(stringNumber)
    expect(stringNumberIsValid).toBe(false)
  })

  test('Verify number returns false', () => {
    const numberIsValid = validate.password(number)
    expect(numberIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const emptyStringIsValid = validate.password(emptyString)
    expect(emptyStringIsValid).toBe(false)
  })

  test('Verify null returns false', () => {
    const nullValIsValid = validate.password(nullVal)
    expect(nullValIsValid).toBe(false)
  })

  test('Verify empty string returns false', () => {
    const undefinedValIsValid = validate.password(undefinedVal)
    expect(undefinedValIsValid).toBe(false)
  })
})
