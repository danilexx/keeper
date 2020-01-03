'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Adventure = use('App/Models/Adventure')
const Master = use('App/Models/Master')

const fields = ['name', 'password']
/**
 * Resourceful controller for interacting with adventures
 */
class AdventureController {
  /**
   * Show a list of all adventures.
   * GET adventures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const adventures = Adventure.query().with('master.user').fetch()
    return adventures
  }

  /**
   * Render a form to be used for creating a new adventure.
   * GET adventures/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new adventure.
   * POST adventures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    // Verifica se o master pertence ao user
    const { master } = request
    const data = request.only(fields)
    const adventure = await Adventure.create({ ...data, owner_id: master.id })
    master.adventure_id = adventure.id
    await master.save()
    return adventure
  }

  /**
   * Display a single adventure.
   * GET adventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing adventure.
   * GET adventures/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update adventure details.
   * PUT or PATCH adventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(fields)

    const { user } = auth

    const adventure = await Adventure.findOrFail(params.id)

    const master = await Master.findOrFail(params.masters_id)
    // Verifica se o master pertence ao user
    if (master.user_id !== user.id) return response.status(401)
    // Verifica se a aventura pertence aquele master
    if (adventure.id !== master.adventure_id) return response.status(401)
    // Atualiza
    adventure.merge(data)
    // Salva
    await adventure.save()

    return adventure
  }

  /**
   * Delete a adventure with id.
   * DELETE adventures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AdventureController
