'use strict'
const PendingFriendship = use('App/Models/PendingFriendship')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingfriendships
 */
const User = use('App/Models/User')

class PendingFriendshipController {
  async store ({ request, auth, response }) {
    const sender_id = auth.user.id
    const { username } = request.only(['username'])
    console.log(username, username.username)
    const user = await User.findByOrFail('username', username.username)
    const receiver_id = user.id
    const pendingFriendship = await PendingFriendship.create({ sender_id, receiver_id })
    return pendingFriendship
  }

  async index ({ auth }) {
    const { user } = auth
    const pendingFriendships = await PendingFriendship
      .query()
      .where('receiver_id', user.id)
      .with('sender', (builder) => {
        builder.with('avatar')
      })
      .fetch()
    // const pendingFriendships = await PendingFriendship.findByOrFail('receiver_id', user.id)
    // await pendingFriendships.load('sender')
    // await pendingFriendships.sender().load('avatar')
    // const pendingFriendships = await user.pendingFriendships().fetch()
    // await sender.load('avatar')
    return pendingFriendships
  }
}

module.exports = PendingFriendshipController
