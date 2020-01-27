'use strict'

const Friendship = use('App/Models/Friendship')
const PendingFriendship = use('App/Models/PendingFriendship')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with friendships
 */
class FriendshipController {
  /**
   * Show a list of all friendships.
   * GET friendships
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const { user } = auth
    const friends = await user.friends().fetch()
    return friends
  }

  /**
   * Render a form to be used for creating a new friendship.
   * GET friendships/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new friendship.
   * POST friendships
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { user } = auth
    const { id: user1_id } = user
    const { to_add_user_id: user2_id, pending_friendship_id } = request.only(['to_add_user_id', 'pending_friendship_id'])
    const row1 = { user1_id, user2_id }
    const row2 = { user1_id: user2_id, user2_id: user1_id }
    const friendship = await Friendship.createMany([row1, row2])
    const pending_friendship = await PendingFriendship.findOrFail(pending_friendship_id)
    pending_friendship.delete()
    return friendship
  }

  /**
   * Display a single friendship.
   * GET friendships/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing friendship.
   * GET friendships/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update friendship details.
   * PUT or PATCH friendships/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a friendship with id.
   * DELETE friendships/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

  }
}

module.exports = FriendshipController
