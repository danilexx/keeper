'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const AdventureLobby = use('App/Models/AdventureLobby')
const PendingAdventure = use('App/Models/PendingAdventure')
/**
 * Resourceful controller for interacting with adventurelobbies
 */
class AdventureLobbyController {
  /**
   * Show a list of all adventurelobbies.
   * GET adventurelobbies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new adventurelobby.
   * POST adventurelobbies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const trx = await Database.beginTransaction()
    const { user } = auth
    const { adventure_id, pending_adventure_id } = request.only(['adventure_id', 'pending_adventure_id'])
    const adventure_lobby = await AdventureLobby.findByOrFail('adventure_id', adventure_id, trx)
    const user_registry = await adventure_lobby.users().attach(user.id, null, trx)
    const pending_adventure = await PendingAdventure.findOrFail(pending_adventure_id, trx)
    await pending_adventure.delete(trx)
    trx.commit()
    return user_registry
  }

  /**
   * Display a single adventurelobby.
   * GET adventurelobbies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing adventurelobby.
   * GET adventurelobbies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update adventurelobby details.
   * PUT or PATCH adventurelobbies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a adventurelobby with id.
   * DELETE adventurelobbies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AdventureLobbyController
