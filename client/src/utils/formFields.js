import validate from './validate'

const fullName = {
        type: 'text',
        name: 'fullname',
        label: 'Full Name',
        initialValue: '',
        validate: validate.string,
        required: true
      },
      username = {
        type: 'text',
        name: 'username',
        label: 'Username',
        initialValue: '',
        validate: validate.string,
        required: true
      },
      email = {
        type: 'email',
        name: 'email',
        label: 'Email',
        initialValue: '',
        validate: validate.email,
        required: true
      },
      password = {
        type: 'password',
        name: 'password',
        label: 'Password',
        initialValue: '',
        validate: validate.password,
        required: true
      }

const register = [fullName, username, email, password]
export default register

export const login = [email, password]


