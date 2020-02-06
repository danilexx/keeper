const createAdventure = require('./createAdventure')
const Factory = use('Factory')

const createPendingAdventure = (client) => async (as = 'character') => {
  const { user: user1, response: adventureResponse } = await createAdventure(client)()
  const user2 = await Factory.model('App/Models/User').create()
  const response = await client.post('/pending_adventures').loginVia(user1).send({
    receiver_Id: user2.id,
    adventure_id: adventureResponse.body.id,
    as
  }).end()
  return { user1, user2, response, adventureResponse }
}

module.exports = createPendingAdventure
