'use strict'
const PendingFriendship = use('App/Models/PendingFriendship')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingfriendships
 */
class PendingFriendshipController {
  async store ({ request, auth }) {
    const sender_id = auth.user.id
    const { receiver_id } = request.only(['receiver_id'])
    const pendingFriendship = await PendingFriendship.create({ sender_id, receiver_id })
    return pendingFriendship
  }

  async index ({ auth }) {
    const { user } = auth
    const pendingFriends = user.pendingFriendships().fetch()
    return pendingFriends
  }
}

module.exports = PendingFriendshipController
