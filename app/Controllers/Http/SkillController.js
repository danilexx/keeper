'use strict'

const Skill = use('App/Models/Skill')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with skills
 */
class SkillController {
  /**
   * Show a list of all skills.
   * GET skills
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { adventure } = request
    const skills = await Skill.query().with('icon').where('adventure_id', adventure.id).fetch()
    return skills
  }

  /**
   * Create/save a new skill.
   * POST skills
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { master, adventure_id } = request
    const data = request.only(['name', 'description', 'type', 'value', 'mana_cost', 'icon_id'])
    const skill = await Skill.create({ ...data, adventure_id, master_id: master.id })
    return skill
  }

  /**
   * Display a single skill.
   * GET skills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update skill details.
   * PUT or PATCH skills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // const { master, adventure_id } = request
    const data = request.only(['name', 'description', 'type', 'value', 'mana_cost', 'icon_id'])
    const skill = await Skill.find(params.id)
    if (!skill) {
      return response.status(404).json({
        error: {
          message: 'skill not found'
        }
      })
    }
    await skill.merge(data)
    await skill.save()
    await skill.load('icon')
    return skill
  }

  /**
   * Delete a skill with id.
   * DELETE skills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const skill = await Skill.find(params.id)
    if (skill) {
      await skill.delete()
    }
    return {
      ok: true
    }
  }
}

module.exports = SkillController
