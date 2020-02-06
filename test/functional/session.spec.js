'use strict'

const { test, trait } = use('Test/Suite')('Session')
trait('Test/ApiClient')
test('POST:  make sure that session is being created', async ({ client, assert }) => {
  await client.post('/users').send({
    username: 'danilex2',
    email: 'danilofalador68@gmail.com',
    email_confirmation: 'danilofalador68@gmail.com',
    password: 'danilo10',
    password_confirmation: 'danilo10'
  }).end()

  const response = await client.post('/sessions').send({
    username: 'danilex2',
    password: 'danilo10'
  }).end()
  response.assertStatus(200)
})
