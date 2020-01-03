'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pendingadventures
 */

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

    const { receiver_id, adventure_id } = request.only(['receiver_id', 'adventure_id'])
    // Achando aventura
    const adventure = await Adventure.findOrFail(adventure_id)
    // Pegando os masters relativos a aventura
    // const masters = await adventure.masters().fetch()
    // Verificando se o user é um master daquela adventure
    // if (!masters.some(master => master.user_id === user.id)) return response.status(401)
    // Cria o pedido de adventure para outra pessoa se juntar
    const pendingAdventure = await PendingAdventure.create({ sender_id: user.id, receiver_id, adventure_id: adventure.id })

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
  }
}

module.exports = PendingAdventureController
