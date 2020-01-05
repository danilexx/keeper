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
    const { master } = request
    const skills = await master.skills().fetch()
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
    const { master } = request
    const data = request.only(['name', 'description', 'type', 'value'])
    const skill = await Skill.create({ ...data, master_id: master.id })
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
    await skill.delete()
    return {
      ok: {
        message: 'Skill deleted with sucess'
      }
    }
  }
}

module.exports = SkillController
