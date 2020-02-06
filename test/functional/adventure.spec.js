'use strict'

const { test, trait } = use('Test/Suite')('Adventure')
const createAdventure = require('../utils/createAdventure')
const createPendingAdventure = require('../utils/createPendingAdventure')
const Factory = use('Factory')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that adventure is being created', async ({ client, assert }) => {
  const { response } = await createAdventure(client)()
  response.assertStatus(200)
})
test('GET: make sure that all adventures related to an user is being returned', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('/users/adventures').loginVia(user).end()
  response.assertStatus(200)
})
test('GET: make sure that an adventures that an user is mastering are being returned', async ({ client, assert }) => {
  const { response: responseAdventure, user } = await createAdventure(client)()
  const response = await client.get(`/adventures/${responseAdventure.body.id}`).loginVia(user).end()
  response.assertStatus(200)
})
test('GET[error]: make sure that when search a not existing adventure returns an 404 error', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('/adventures/999').loginVia(user).end()
  response.assertStatus(404)
})
test('GET[error]: make sure that when trying to acess an adventure that i not in returns an 401 error', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const { response: responseAdventure } = await createAdventure(client)()
  const response = await client.get(`/adventures/${responseAdventure.body.id}`).loginVia(user).end()
  response.assertStatus(401)
})
test('GET: make sure that all adventures related to an user is being returned', async ({ client, assert }) => {
  const { response: pendingResponse, user2, adventureResponse } = await createPendingAdventure(client)()
  await client.post('/adventure_lobbies').loginVia(user2).send({
    adventure_id: adventureResponse.body.id,
    pending_adventure_id: pendingResponse.body.id
  }).end()
  const response = await client.get('users/adventures').loginVia(user2).end()
  response.assertStatus(200)
})
