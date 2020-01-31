'use strict'
const createPendingFriendship = require('../utils/createPendingFriendship')
const { test, trait } = use('Test/Suite')('Pending Friendship')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that pending friendships are getting send', async ({ client, assert }) => {
  const { response } = await createPendingFriendship(client)()
  response.assertStatus(200)
})
test('GET: make sure that pending friendships are getting returned', async ({ client, assert }) => {
  const { user2 } = await createPendingFriendship(client)()
  const response = await client.get('/pending_friendships').loginVia(user2).end()
  response.assertStatus(200)
})
test('DELETE: make sure that pending friendships are getting refused', async ({ client, assert }) => {
  const { user2, response: pendingResponse } = await createPendingFriendship(client)()
  const response = await client.delete(`/pending_friendships/${pendingResponse.body.id}`).loginVia(user2).end()
  response.assertStatus(200)
})
