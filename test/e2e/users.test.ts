import { strict } from 'assert'

describe('my-test', () => {
  it('it 1', async () => {
    const user = {
      username: 'johnfaria',
      fullname: 'John Faria',
      email: 'john@hotmail.com',
      password: '123@203010',
    }

    const response = await global.testRequest.post('/auth/signup').send(user)
    expect(response.body).toHaveProperty('languages')
  })

  it('it 2', async () => {
    const user = {
      username: 'johnfaria',
      fullname: 'John Faria',
      email: 'john@hotmail.com',
      password: '123@203010',
    }

    await global.testRequest.post('/auth/signup').send(user)

    const response = await global.testRequest.get('/api/user')
    expect(response.body).toBeDefined()
  })
})
