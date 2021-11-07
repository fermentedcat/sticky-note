import validate from './validate'

const fullName = {
  type: 'text',
  name: 'fullname',
  label: 'Full Name',
  initialValue: '',
  validate: validate.string,
  required: true,
}
const username = {
  type: 'text',
  name: 'username',
  label: 'Username',
  initialValue: '',
  validate: validate.string,
  required: true,
}
const email = {
  type: 'text',
  name: 'email',
  label: 'Email',
  initialValue: '',
  validate: validate.email,
  required: true,
}
const password = {
  type: 'password',
  name: 'password',
  label: 'Password',
  initialValue: '',
  validate: validate.password,
  required: true,
}
const loginName = {
  type: 'text',
  name: 'email',
  label: 'Email / Username',
  initialValue: '',
  validate: validate.string,
  required: true,
}
const title = {
  type: 'text',
  name: 'title',
  label: 'Title',
  initialValue: '',
  validate: validate.string,
  required: true,
}
const description = {
  type: 'text',
  name: 'description',
  label: 'Description',
  initialValue: '',
  validate: validate.string,
}
const markdown = {
  type: 'textarea',
  name: 'markdown',
  placeholder: `## My Great Heading

  - [x] Write the press release
  - [ ] Update the website
  - [ ] Contact the media
  
  ~~The world is flat.~~
  
  | Table | Headers |
  | ----------- | ----------- |
  | One | Thing |
  | Another | Thing |
  
  ### Smaller Subheading
  
  - Bullet list item
  - Second bullet list item
  - Third bullet list item
  
  1. One
  1. Two
  1. Three
  `,
  label: '',
  initialValue: '',
  validate: validate.string,
}

const register = { fullName, username, email, password }
export default register

export const login = { loginName, password }
export const todo = { title, markdown }
export const stack = { title, description }
