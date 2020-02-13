'use strict'

const Ws = use('Ws')

const AdventureMessageHook = exports = module.exports = {}

AdventureMessageHook.method = async (modelInstance) => {
}

AdventureMessageHook.sendWs = async message => {
  const adventureLobby = await message.adventureLobby().fetch()
  const adventure = await adventureLobby.adventure().fetch()
  const adventure_id = adventure.id
  const topic = Ws.getChannel('social:*').topic(`social:${adventure_id}`)
  console.log(`trying to emit to social:${adventure_id}`)
  if (topic) {
    await message.load('master.user.avatar')
    await message.load('character.user.avatar')
    await message.load('user.avatar')
    console.log(`sucessfull emitted to social:${adventure_id}`)
    topic.broadcastToAll('new:message', message)
  }
}
