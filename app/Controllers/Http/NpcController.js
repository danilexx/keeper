'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CharactersConfig = use('App/Models/CharactersConfig')
const Npc = use('App/Models/Npc')
const { inventorySync } = use('App/Util')
/**
 * Resourceful controller for interacting with npcs
 */
class NpcController {
  /**
   * Show a list of all npcs.
   * GET npcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new npc.
   * POST npcs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const { user } = auth
    const { master_id } = request
    const { attributes, inventory, experiences = {}, ...data } = request.only([
      'name',
      'appearance',
      'attributes',
      'experience',
      'lore',
      'personality',
      'age',
      'height',
      'gender',
      'icon_id',
      'race',
      'experiences'
    ])
    const {
      default_gold,
      default_life,
      default_mana,
      default_base_experience_value,
      default_melee_experience_value,
      default_ranged_experience_value,
      default_magic_experience_value,
      default_miracle_experience_value
    } = await CharactersConfig.findByOrFail(
      'adventure_id',
      params.adventures_id
    )
    const toCreateChar = {
      ...data,
      life: default_life,
      max_life: default_life,
      mana: default_mana,
      max_mana: default_mana,
      gold: default_gold,
      adventure_id: params.adventures_id,
      user_id: user.id,
      master_id
    }
    const npc = await Npc.create(toCreateChar)
    await npc.attributes().create(attributes)
    const {
      base_experience,
      melee_experience,
      ranged_experience,
      magic_experience,
      miracle_experience
    } = experiences
    await npc.experiences().create({
      base_experience: base_experience || default_base_experience_value,
      melee_experience: melee_experience || default_melee_experience_value,
      ranged_experience: ranged_experience || default_ranged_experience_value,
      magic_experience: magic_experience || default_magic_experience_value,
      miracle_experience: miracle_experience || default_miracle_experience_value
    })
    if (inventory) {
      await inventorySync(inventory, npc)
    }
    await npc.loadMany(['attributes', 'experiences', 'inventory'])
    return npc
  }

  /**
   * Display a single npc.
   * GET npcs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing npc.
   * GET npcs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update npc details.
   * PUT or PATCH npcs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const { attributes, experiences, inventory, ...data } = request.only([
      'name',
      'appearance',
      'attributes',
      'experience',
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
    const npc = await Npc.findOrFail(params.id)
    npc.merge(data)
    if (attributes) {
      await npc.attributes().create(attributes)
    }
    if (experiences) {
      await npc.experiences().create(experiences)
    }
    await inventorySync(inventory, npc)
    await npc.loadMany(['attributes', 'experiences'])
    return npc
  }

  /**
   * Delete a npc with id.
   * DELETE npcs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const char = await Npc.findOrFail(params.id)
    await char.delete()
    return { message: 'Npc deleted!' }
  }
}

module.exports = NpcController
