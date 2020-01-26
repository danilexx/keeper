'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Adventure = use('App/Models/Adventure')
const Database = use('Database')
const AdventureLobby = use('App/Models/AdventureLobby')
const CharactersConfig = use('App/Models/CharactersConfig')
const fields = ['name', 'password', 'options', 'maxPlayers', 'description', 'avatar_id']
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
  async index ({ request, response, auth }) {
    const { user } = auth
    console.log(user)
    const adventures = await user.masteringAdventures().with('avatar').with('lobby').fetch()

    return adventures
  }

  async all ({ request, response, view }) {
    const adventures = await Adventure.query().with('avatar').with('lobby').fetch()
    // await adventures.load('avatar')
    return adventures
  }

  async all ({ request, response, view }) {
    const adventures = Adventure.all()
    return adventures
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
    const trx = await Database.beginTransaction()
    const { master } = request
    const { maxPlayers, options, ...data } = request.only(fields)
    const adventure = await Adventure.create({ ...data, owner_id: master.id }, trx)
    master.adventure_id = adventure.id
    await AdventureLobby.create({ maxPlayers, adventure_id: adventure.id }, trx)
    await CharactersConfig.create({ ...options, adventure_id: adventure.id }, trx)
    await master.save(trx)
    await trx.commit()
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
    const adventure = await Adventure.findOrFail(params.adventures_id)
    await adventure.load('masters.user.avatar')
    await adventure.load('lobby')
    return adventure
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

    const master = request.master

    const adventure = await Adventure.findOrFail(params.id)

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
    const adventure = await Adventure.findOrFail(params.id)
    await adventure.delete()
    return {
      message: 'Adventure Deleted'
    }
  }
}

module.exports = AdventureController
