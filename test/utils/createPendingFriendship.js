const Factory = use('Factory')

const createPendingFriendship = (client) => async () => {
  const user1 = await Factory.model('App/Models/User').create()
  const user2 = await Factory.model('App/Models/User').create()
  const response = await client.post('/pending_friendships').loginVia(user1).send({
    username: user2.username
  }).end()
  return { user1, user2, response }
}

module.exports = createPendingFriendship
