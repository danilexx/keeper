'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CharactersConfig = use('App/Models/CharactersConfig')
const Character = use('App/Models/Character')
const Adventure = use('App/Models/Adventure')
/**
 * Resourceful controller for interacting with characters
 */
class CharacterController {
  /**
   * Show a list of all characters.
   * GET characters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new character.
   * POST characters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params, auth }) {
    const { user } = auth
    const { isMaster, master_id } = request
    const { attributes, ...data } = request.only(['name', 'appearance', 'attributes', 'experience', 'lore', 'personality', 'age', 'height', 'gender', 'icon_id'])
    const { default_gold, default_life, default_mana, default_base_experience, default_melee_experience, default_ranged_experience, default_magic_experience, default_miracle_experience } = await CharactersConfig.findByOrFail('adventure_id', params.adventures_id)
    const toCreateChar = { ...data, life: default_life, max_life: default_life, mana: default_mana, max_mana: default_mana, gold: default_gold, adventure_id: params.adventures_id, user_id: user.id, ...(isMaster ? { master_id } : {}) }
    const character = await Character.create(toCreateChar)
    await character.attributes().create(attributes)
    await character.experiences().create({
      base_experience: default_base_experience,
      melee_experience: default_melee_experience,
      ranged_experience: default_ranged_experience,
      magic_experience: default_magic_experience,
      miracle_experience: default_miracle_experience
    })
    await character.load('attributes')
    return character
  }

  /**
   * Display a single character.
   * GET characters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update character details.
   * PUT or PATCH characters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a character with id.
   * DELETE characters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const char = await Character.findOrFail(params.id)
    await char.delete()
    return { message: 'Character deleted!' }
  }
}

module.exports = CharacterController
