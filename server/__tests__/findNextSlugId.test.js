/* eslint-disable indent */
/* eslint-disable no-undef */
const { findNextId, findNextSlug } = require('../utils/addNextSlugId')

describe('Testing findNextId returns next available id', () => {
  test('Verify new slug gets id if not unique', () => {
    let nextId = 0
    const existingSlug = 'hej-hej'
    const newSlug = 'hej-hej'
    nextId = findNextId(existingSlug, newSlug, nextId)
    expect(nextId).toBe(0)
  })
  test('Verify new slug gets next id if not unique', () => {
    let nextId = 0
    const existingSlug = 'hej-hej--2'
    const newSlug = 'hej-hej'
    nextId = findNextId(existingSlug, newSlug, nextId)
    expect(nextId).toBe(3)
  })
})

describe('Testing findNextSlug returns next available slug', () => {
  test('Verify new slug gets no id if unique', () => {
    let nextId = 0
    const stacks = [
      { slug: 'hej-hej-hej' },
      { slug: 'hej-hej-hej-hej' }
    ]
    const newSlug = 'hej-hej'
    nextId = findNextSlug(stacks, newSlug)
    expect(nextId).toBe('hej-hej')
  })

  test('Verify new slug gets id if not unique', () => {
    let nextId = 0
    const stacks = [
      { slug: 'hej-hej' }
    ]
    const newSlug = 'hej-hej'
    nextId = findNextSlug(stacks, newSlug)
    expect(nextId).toBe('hej-hej--0')
  })

  test('Verify new slug gets next id if multiple other of same slug', () => {
    let nextId = 0
    const stacks = [
      { slug: 'hej-hej-hej' },
      { slug: 'hej-hej' },
      { slug: 'hej-hej--0' },
      { slug: 'hej-hej--1' },
      { slug: 'hej-hej--2' }
    ]
    const newSlug = 'hej-hej'
    nextId = findNextSlug(stacks, newSlug)
    expect(nextId).toBe('hej-hej--3')
  })
})
