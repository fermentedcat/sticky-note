const addNextSlugId = async (initialSlug, constructor) => {
  let addId = false
  let slug = initialSlug
  try {
    const stacks = await findAllBySlug(slug, constructor)
    if (stacks.length > 0) {
      let nextId = 0
      stacks.forEach((stack) => {
        if (slug === stack.slug) {
          // only add --id if exact slug match exists
          addId = true
        }
        if (slug !== stack.slug) {
          nextId = findNextId(stack, slug, nextId)
        }
      })
      if (addId) {
        slug = `${slug}--${nextId}`
      }
    }
    return slug
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

const findNextId = (stack, slug, nextId) => {
  // get the string after the last '-'
  const lastHyphenIndex = stack.slug.lastIndexOf('--')
  if (lastHyphenIndex > 0) {
    // check if slug before id === new slug
    const id = +stack.slug.substring(lastHyphenIndex + 2)
    const slugStart = stack.slug.substring(0, lastHyphenIndex)
    // increase next id number if found same slug with id number
    if (slug === slugStart && nextId <= id) {
      return id + 1
    }
  }
  return nextId
}

module.exports = addNextSlugId
