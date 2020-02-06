'use strict'
const createPendingFriendship = require('../utils/createPendingFriendship')
const { test, trait } = use('Test/Suite')('Friendship')
trait('Test/ApiClient')
trait('Auth/Client')
test('POST: make sure that pending friendships can be accepted', async ({ client, assert }) => {
  const { response: pendingResponse, user2, user1 } = await createPendingFriendship(client)()
  const response = await client.post('/friendships').send({
    to_add_user_id: user1.id,
    pending_friendship_id: pendingResponse.body.id
  }).loginVia(user2).end()
  response.assertStatus(200)
})
test('GET: make sure that friendships are been returned', async ({ client, assert }) => {
  const { response: pendingResponse, user2, user1 } = await createPendingFriendship(client)()
  await client.post('/friendships').send({
    to_add_user_id: user1.id,
    pending_friendship_id: pendingResponse.body.id
  }).loginVia(user2).end()
  const response = await client.get('/friendships').loginVia(user2).end()
  response.assertStatus(200)
})
test('DELETE: make sure that friendship are getting deleted', async ({ client, assert }) => {
  const { response: pendingResponse, user2, user1 } = await createPendingFriendship(client)()
  await client.post('/friendships').send({
    to_add_user_id: user1.id,
    pending_friendship_id: pendingResponse.body.id
  }).loginVia(user2).end()
  const response = await client.delete(`/friendships/${user1.id}`).loginVia(user2).end()
  response.assertStatus(200)
})
