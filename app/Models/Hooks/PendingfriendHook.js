'use strict'

const PendingfriendHook = exports = module.exports = {}

PendingfriendHook.method = async (modelInstance) => {
}
const Ws = use('Ws')
PendingfriendHook.sendWs = async pendingFriend => {
  const { receiver_id } = pendingFriend

  const topic = Ws.getChannel('pendingFriends:*').topic(`pendingFriends:${receiver_id}`)
  console.log(`trying to emit to pendingFriends:${receiver_id}`)
  if (topic) {
    await pendingFriend.load('sender.avatar')

    console.log(`sucessfull emitted to pendingFriends:${receiver_id}`)
    topic.broadcastToAll('new:request', pendingFriend)
  }
}
