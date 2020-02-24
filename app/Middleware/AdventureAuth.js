'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Adventure = use('App/Models/Adventure')
const Character = use('App/Models/Character')
class AdventureAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ params, auth, response, request }, next, properties) {
    const { user } = auth
    const adventure_id = params.adventures_id
    request.adventure_id = adventure_id
    const adventure = await Adventure.find(adventure_id)
    if (!adventure) {
      return response.status(404).send({
        error: 'Adventure not found'
      })
    }
    request.adventure = adventure
    const adventureLobby = await adventure.lobby().fetch()
    await adventureLobby.load('users.avatar')
    await adventureLobby.load('masters.avatar')
    const masters = await adventureLobby
      .masters()
      .where('user_id', user.id)
      .fetch()
    const master = masters.rows[0]
    request.adventureLobby = adventureLobby
    const isMasterOnAdventure = Boolean(master)
    if (isMasterOnAdventure) {
      request.isMaster = true
      request.master_id = master.id
      request.master = master
    }
    const users = await adventureLobby.users().fetch()
    const user_on_adventure_instance = users.rows[0]
    const isUserOnAdventure = Boolean(user_on_adventure_instance)
    if (isUserOnAdventure) {
      const user_id = user.id
      const characters = await Character.findBy('user_id', user_id)

      const character = characters ? characters.rows[0] : undefined
      if (character) {
        request.character_id = character.id
        request.character = character
      }
    }
    request.isUserOnAdventure = isUserOnAdventure
    if (properties.some(e => e === 'ignore')) {
      await next()
      return
    }
    if (!isUserOnAdventure && !isMasterOnAdventure) {
      return response.status(401).send({
        error: {
          message:
            'You are not permited to acess this adventure'
        }
      })
    }
    // call next to advance the request
    await next()
  }
}

module.exports = AdventureAuth
