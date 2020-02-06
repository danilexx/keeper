'use strict'

const FriendshipHook = exports = module.exports = {}

FriendshipHook.method = async (modelInstance) => {
}
const User = use('App/Models/User')
const Ws = use('Ws')

FriendshipHook.sendWs = async friendship => {
  const { user1_id, user2_id } = friendship
  const topic = Ws.getChannel('friendship:*').topic(`friendship:${user1_id}`)
  console.log(`trying to emit to friendship:${user1_id}`)
  if (topic) {
    const user = await User.findOrFail(user2_id)
    console.log(`sucessfull emited to friendship:${user1_id}`)
    await user.load('avatar')
    await user.load('pendingAdventures')
    await user.load('lobbies')
    topic.broadcastToAll('new:friend', user)
  }
}
FriendshipHook.sendWsDeletion = async friendship => {
  const { user1_id, user2_id } = friendship

  const topic = Ws.getChannel('friendship:*').topic(`friendship:${user2_id}`)
  if (topic) {
    const user = await User.findOrFail(user1_id)
    await user.load('avatar')
    topic.broadcastToAll('delete:friend', user)
  }
}
