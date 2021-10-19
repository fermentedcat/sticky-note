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
    initialValue: 'My New Todo',
    validate: validate.string,
    required: true,
  },
  description = {
    type: 'text',
    name: 'description',
    label: 'Description',
    initialValue: 'Todo list description',
    validate: validate.string,
  },
  markdown = {
    type: 'text',
    name: 'markdown',
    label: '',
    initialValue: 'My new todo list',
    validate: validate.string,
  }

const register = { fullName, username, email, password }
export default register

export const login = { loginName, password }
export const todo = { title, description, markdown }
