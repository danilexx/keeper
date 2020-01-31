'use strict'

const { test, trait } = use('Test/Suite')('User')
trait('Test/ApiClient')
test('POST: make sure that user is being registered', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    username: 'danilex',
    email: 'danilofalador67@gmail.com',
    email_confirmation: 'danilofalador67@gmail.com',
    password: 'danilo10',
    password_confirmation: 'danilo10'
  }).end()
  response.assertStatus(200)
})
