'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SocialMessage = use('App/Models/SocialMessage')
/**
 * Resourceful controller for interacting with socialmessages
 */
class SocialMessageController {
  /**
   * Show a list of all socialmessages.
   * GET socialmessages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { adventureLobby } = request
    const messages = await adventureLobby.socialMessages().setVisible(['message', 'created_at', 'id']).with('character', builder => {
      builder.setVisible(['name', 'id'])
      builder.with('user', builder => {
        builder.setVisible(['username', 'id'])
      })
    }).with('master', builder => {
      builder.setVisible(['name', 'id'])
      builder.with('user', builder => {
        builder.setVisible(['username', 'id'])
      })
    }).fetch()
    return messages
  }

  /**
   * Create/save a new socialmessage.
   * POST socialmessages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { message } = request.only(['message'])
    const { master_id, character_id, isMaster, adventureLobby } = request
    console.log(character_id)
    const adventure_lobby_id = adventureLobby.toJSON().id
    const getOwner = () => {
      if (isMaster) {
        return { master_id }
      } else if (character_id) {
        return { character_id }
      }
    }
    const socialMessage = await SocialMessage.create({ adventure_lobby_id, message, ...(getOwner()) })
    return socialMessage
  }

  /**
   * Display a single socialmessage.
   * GET socialmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update socialmessage details.
   * PUT or PATCH socialmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a socialmessage with id.
   * DELETE socialmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SocialMessageController
