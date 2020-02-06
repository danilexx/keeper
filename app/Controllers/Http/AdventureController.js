'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Adventure = use('App/Models/Adventure')
const AdventureLobby = use('App/Models/AdventureLobby')
const User = use('App/Models/User')
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
    const adventures = await user.masteringAdventures().with('avatar').with('lobby').fetch()

    return adventures
  }

  async all ({ request, response, view }) {
    const adventures = await Adventure.query().with('avatar').with('lobby').fetch()
    // await adventures.load('avatar')
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
  async store ({ request, response }) {
    // Verifica se o master pertence ao user
    const { master, isMaster } = request

    if (!isMaster) {
      return response.status(401).send({ error: 'you are not master' })
    }
    console.log('aaaa')
    const { maxPlayers, options, ...data } = request.only(fields)

    const adventure = await Adventure.create({ ...data, owner_id: master.id })
    master.adventure().associate(adventure)
    await adventure.lobby().create({ maxPlayers })
    await adventure.charactersConfig().create(options)
    await master.save()
    return adventure
  }

  async private ({ auth }) {
    const { user } = auth
    // const adventures = Database.table('adventures').where('id', 1)
    // const lobbies = await user.lobbies().fetch()
    const user2 = await User.query().where('id', user.id).with('lobbies.adventure', builder => {
      builder.with('avatar').with('lobby')
    }).fetch()
    const adventures = user2.toJSON().map(user => user.lobbies.map(lobby => ({ ...lobby.adventure, isMaster: false }))).flat()
    const masteringAdventures = await user.masteringAdventures().with('avatar').with('lobby').fetch()
    const mAdventures = masteringAdventures.toJSON().map(e => ({ ...e, isMaster: true }))
    // console.log(lobbies)
    return [...adventures, ...mAdventures]
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
