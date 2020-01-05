'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const AdventureLobby = use('App/Models/AdventureLobby')
class AdventureAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ params, auth, response, request }, next) {
    const { user } = auth
    const adventure_id = params.adventures_id
    const adventureLobby = await AdventureLobby.query().with('users', builder => {
      builder.where('user_id', user.id)
    }).with('masters', builder => {
      builder.where('user_id', user.id)
    }).where('adventure_id', adventure_id).fetch()
    if (adventureLobby.toJSON()[0] === undefined) {
      return response.status(401).send({
        error: {
          message: 'Adventure not found'
        }
      })
    }
    // return response.send(adventureLobby.toJSON()[0].masters)
    const isMasterOnAdventure = adventureLobby.toJSON()[0].masters.length > 0
    const isUserOnAdventure = adventureLobby.toJSON()[0].users.length > 0
    if (isMasterOnAdventure) {
      request.isMaster = true
      request.master_id = adventureLobby.toJSON()[0].masters[0].id
    }
    request.isUserOnAdventure = isUserOnAdventure
    if (!isUserOnAdventure && !isMasterOnAdventure) {
      return response.status(401).send({
        error: {
          message: 'Your not permited to create a character in this adventure lobby'
        }
      })
    }
    // call next to advance the request
    await next()
  }
}

module.exports = AdventureAuth
