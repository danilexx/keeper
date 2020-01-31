'use strict'
const createPendingAdventure = require('../utils/createPendingAdventure')
const { test, trait } = use('Test/Suite')('Adventure Lobbie')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that pending adventures with master marker can be accepted', async ({ client, assert }) => {
  const { response: pendingResponse, user2, adventureResponse } = await createPendingAdventure(client)('master')
  const response = await client.post('/adventure_lobbies').loginVia(user2).send({
    adventure_id: adventureResponse.body.id,
    master_name: 'dumbledoro',
    pending_adventure_id: pendingResponse.body.id
  }).end()
  response.assertStatus(200)
})
test('POST: make sure that pending adventures with character marker can be accepted', async ({ client, assert }) => {
  const { response: pendingResponse, user2, adventureResponse } = await createPendingAdventure(client)()
  const response = await client.post('/adventure_lobbies').loginVia(user2).send({
    adventure_id: adventureResponse.body.id,
    master_name: 'dumbledoro',
    pending_adventure_id: pendingResponse.body.id
  }).end()
  response.assertStatus(200)
})
test('GET: make sure that pending adventures are getting returned', async ({ client, assert }) => {
  const { user2 } = await createPendingAdventure(client)()
  const response = await client.get('/pending_adventures').loginVia(user2).end()
  response.assertStatus(200)
})
