const addNextSlugId = async (initialSlug, constructor) => {
  try {
    const stacks = await findAllBySlug(initialSlug, constructor)
    const newSlug = findNextSlug(stacks, initialSlug)
    return newSlug
  } catch (error) {
    throw new Error(error.message)
  }
}

const findAllBySlug = async (slug, constructor) => {
  try {
    // check for any matching slugs to add --id
    const stacks = await constructor
      .find({ slug: { $regex: slug } })
      .select('slug')
    return stacks
  } catch (error) {
    throw new Error(error.message)
  }
}

const findNextSlug = (stacks, newSlug) => {
  let addId = false
  if (stacks.length > 0) {
    let nextId = 0
    stacks.forEach((stack) => {
      if (newSlug === stack.slug) {
        // only add --id if exact slug match exists
        addId = true
      }
      if (newSlug !== stack.slug) {
        nextId = findNextId(stack.slug, newSlug, nextId)
      }
    })
    if (addId) {
      return `${newSlug}--${nextId}`
    }
  }
  return newSlug
}

const findNextId = (existingSlug, newSlug, nextId) => {
  // get the string after the last '-'
  const lastHyphenIndex = existingSlug.lastIndexOf('--')
  if (lastHyphenIndex > 0) {
    // check if slug before id === new slug
    const id = +existingSlug.substring(lastHyphenIndex + 2)
    const slugStart = existingSlug.substring(0, lastHyphenIndex)
    // increase next id number if found same slug with id number
    if (newSlug === slugStart && nextId <= id) {
      return id + 1
    }
  }
  return nextId
}

module.exports = { addNextSlugId, findNextSlug, findNextId }
