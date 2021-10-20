import validate from './validate'

const fullName = {
    type: 'text',
    name: 'fullname',
    label: 'Full Name',
    initialValue: '',
    validate: validate.string,
    required: true,
  },
  username = {
    type: 'text',
    name: 'username',
    label: 'Username',
    initialValue: '',
    validate: validate.string,
    required: true,
  },
  email = {
    type: 'text',
    name: 'email',
    label: 'Email',
    initialValue: '',
    validate: validate.email,
    required: true,
  },
  password = {
    type: 'password',
    name: 'password',
    label: 'Password',
    initialValue: '',
    validate: validate.password,
    required: true,
  },
  loginName = {
    type: 'text',
    name: 'email',
    label: 'Email / Username',
    initialValue: '',
    validate: validate.string,
    required: true,
  },
  title = {
    type: 'text',
    name: 'title',
    label: 'Title',
    initialValue: '',
    validate: validate.string,
    required: true,
  },
  description = {
    type: 'text',
    name: 'description',
    label: 'Description',
    initialValue: '',
    validate: validate.string,
  },
  markdown = {
    type: 'text',
    name: 'markdown',
    label: '',
    initialValue: '',
    validate: validate.string,
  }

const register = { fullName, username, email, password }
export default register

export const login = { loginName, password }
export const todo = { title, description, markdown }
export const stack = { title, description }
