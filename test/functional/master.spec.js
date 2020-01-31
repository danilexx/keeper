'use strict'

const { test, trait } = use('Test/Suite')('Master')
const Factory = use('Factory')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that master is being created', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.post('/masters').loginVia(user).send({
    name: 'dumbledore'
  }).end()
  response.assertStatus(200)
})
test('GET: make sure that masters is being returned', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('/masters').loginVia(user).end()
  response.assertStatus(200)
})
