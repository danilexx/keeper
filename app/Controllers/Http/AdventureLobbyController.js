'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Database = use('Database')
const Adventure = use('App/Models/Adventure')
const Master = use('App/Models/Master')
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
  async store ({ request, auth, response }) {
    const trx = await Database.beginTransaction()
    const { user } = auth
    const { pending_adventure_id, master_name } = request.only(['adventure_id', 'pending_adventure_id', 'master_name'])
    const pending_adventure = await PendingAdventure.findOrFail(pending_adventure_id, trx)
    if (pending_adventure.sender_id === user.id) {
      return response.status(400).send({
        message: 'You cant accept that invitation'
      })
    }
    const adventure = await Adventure.findOrFail(pending_adventure.adventure_id)
    const adventure_lobby = await adventure.lobby().fetch()
    let master = null
    let user_registry = null
    if (pending_adventure.as === 'master') {
      master = await Master.create({ name: master_name, adventure_id: adventure.id, user_id: user.id }, trx)
    } else {
      user_registry = await adventure_lobby.users().attach(user.id, null, trx)
    }
    await pending_adventure.delete(trx)
    trx.commit()
    return { master: master, registry: user_registry }
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
