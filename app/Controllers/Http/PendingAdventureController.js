'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingadventures
 */
const { adventureAuth } = use('App/Util')
const Adventure = use('App/Models/Adventure')
const PendingAdventure = use('App/Models/PendingAdventure')
class PendingAdventureController {
  /**
   * Show a list of all pendingadventures.
   * GET pendingadventures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const { user } = auth
    const pendingAdventures = user.pendingAdventures().with('sender.avatar').fetch()
    return pendingAdventures
  }

  /**
   * Create/save a new pendingadventure.
   * POST pendingadventures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { user } = auth
    const { receiver_id, adventure_id, as } = request.only(['receiver_id', 'adventure_id', 'as'])
    let isMaster = false
    try {
      const response = await adventureAuth(adventure_id, user)
      isMaster = response.isMaster
    } catch (err) {
      console.error(err)
    }

    if (as === 'master' && !isMaster) {
      return response.status(401).send({ message: "you can't invite this user to be a master if you aren't" })
    }
    // Achando aventura
    const adventure = await Adventure.findOrFail(adventure_id)
    const pendingAdventure = await PendingAdventure.create({ sender_id: user.id, receiver_id, adventure_id: adventure.id, as })

    return pendingAdventure
  }

  /**
   * Display a single pendingadventure.
   * GET pendingadventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pendingadventure.
   * GET pendingadventures/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pendingadventure details.
   * PUT or PATCH pendingadventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pendingadventure with id.
   * DELETE pendingadventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const pendingAdventure = await PendingAdventure.findOrFail(params.id)
    await pendingAdventure.delete()
    return response.status(200).send({ ok: true })
  }
}

module.exports = PendingAdventureController
