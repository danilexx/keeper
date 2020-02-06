'use strict'
const createPendingAdventure = require('../utils/createPendingAdventure')
const { test, trait } = use('Test/Suite')('Pending Adventure')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that pending adventures are getting send with master marker', async ({ client, assert }) => {
  const { response } = await createPendingAdventure(client)('master')
  // response.assertStatus(200)
  response.assertJSONSubset({
    as: 'master'
  })
})
test('POST: make sure that pending adventures are getting send with character marker', async ({ client, assert }) => {
  const { response } = await createPendingAdventure(client)('character')
  // response.assertStatus(200)
  response.assertJSONSubset({
    as: 'character'
  })
})
test('GET: make sure that pending adventures are getting returned', async ({ client, assert }) => {
  const { user2 } = await createPendingAdventure(client)()
  const response = await client.get('/pending_adventures').loginVia(user2).end()
  response.assertStatus(200)
})
test('DELETE: make sure that pending adventure can be refused', async ({ client, assert }) => {
  const { user2, response: pendingResponse } = await createPendingAdventure(client)()
  const response = await client.delete(`/pending_adventures/${pendingResponse.body.id}`).loginVia(user2).end()
  response.assertStatus(200)
})
