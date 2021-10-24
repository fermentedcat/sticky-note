/* eslint-disable indent */
/* eslint-disable no-undef */
const createToken = require('../utils/createToken')
const app = require('../app')
const request = require('supertest')

const user = {
  username: 'testUser',
  _id: '12345',
  role: 'user'
}

describe('Testing create token and authentication', () => {
  let server = null
  const userToken = createToken(user)

  beforeAll(() => {
    server = app.listen(3000)
  })

  afterAll(async () => {
    await server.close()
  })

  test('Verify createToken returns string', () => {
    expect(typeof userToken).toBe('string')
  })

  test('Verify userAuth returns user with status 200', () => {
    request(app)
      .get('/api/user/auth')
      .set('x-auth-token', userToken)
      .then((response) => {
        const { body } = response
        expect(response.statusCode).toBe(200)
        expect(body.username).toBe('testUser')
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
  })

  test('Verify userAuth returns 403 if no token ', () => {
    request(app)
      .get('/api/user/auth')
      .then((response) => {
        expect(response.statusCode).toBe(403)
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
  })

  test('Verify adminAuth returns 403 if not role admin ', () => {
    request(app)
      .get('/api/user/')
      .set('x-auth-token', userToken)
      .then((response) => {
        expect(response.statusCode).toBe(403)
      })
      .catch((err) => {
        expect(err).toBe(null)
      })
  })
})
