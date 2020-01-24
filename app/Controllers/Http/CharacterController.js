'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CharactersConfig = use('App/Models/CharactersConfig')
const Character = use('App/Models/Character')
const { inventorySync } = use('App/Util')
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
  async index ({ request, response, auth, params }) {
    const { user } = auth
    const characters = await user.characters().where('adventure_id', params.adventures_id).fetch()
    return characters
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
    const { attributes, inventory, ...data } = request.only([
      'name',
      'appearance',
      'inventory',
      'attributes',
      'expertise',
      'lore',
      'personality',
      'age',
      'height',
      'gender',
      'icon_id',
      'race'
    ])
    const {
      default_gold,
      default_life,
      default_mana,
      default_base_expertise,
      default_melee_expertise,
      default_ranged_expertise,
      default_magic_expertise,
      default_miracle_expertise
    } = await CharactersConfig.findByOrFail('adventure_id', params.adventures_id)
    const toCreateChar = { ...data, life: default_life, max_life: default_life, mana: default_mana, max_mana: default_mana, gold: default_gold, adventure_id: params.adventures_id, user_id: user.id }
    const character = await Character.create(toCreateChar)
    await character.attributes().create(attributes)
    await character.expertises().create({
      base_expertise: default_base_expertise,
      melee_expertise: default_melee_expertise,
      ranged_expertise: default_ranged_expertise,
      magic_expertise: default_magic_expertise,
      miracle_expertise: default_miracle_expertise
    })
    await inventorySync(inventory, character)
    await character.loadMany(['attributes', 'expertises', 'inventory'])
    return character
  }

  /**
   * Update character details.
   * PUT or PATCH characters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const { attributes, expertises, inventory, ...data } = request.only([
      'name',
      'appearance',
      'attributes',
      'expertise',
      'inventory',
      'lore',
      'personality',
      'age',
      'height',
      'gender',
      'icon_id',
      'race',
      'life',
      'max_life',
      'mana',
      'max_mana',
      'gold'
    ])
    const character = await Character.findOrFail(params.id)
    character.merge(data)
    if (attributes) {
      await character.attributes().create(attributes)
    }
    if (expertises) {
      await character.expertises().create(expertises)
    }

    await inventorySync(inventory, character)

    await character.loadMany(['attributes', 'expertises', 'inventory'])
    return character
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
