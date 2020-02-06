'use strict'

const PendingAdventureHook = exports = module.exports = {}

PendingAdventureHook.method = async (modelInstance) => {
}
const Ws = use('Ws')
PendingAdventureHook.sendWs = async pendingAdventure => {
  const { receiver_id } = pendingAdventure

  const topic = Ws.getChannel('pendingAdventures:*').topic(`pendingAdventures:${receiver_id}`)
  console.log(`pendingAdventures:${receiver_id}`)
  if (topic) {
    await pendingAdventure.load('sender.avatar')
    await pendingAdventure.load('adventure')
    topic.broadcastToAll('new:request', pendingAdventure)
  }
}
