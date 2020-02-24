'use strict'

class PublicAdventureController {
  async show({ request, response, params, auth }) {
    const { user } = auth
    const { adventureLobby, adventure, isUserOnAdventure } = request
    if (adventure.toJSON().hasPassword) {
      return response.status(401).json({
        error: {
          message: 'require password'
        }
      })
    }
    if (!isUserOnAdventure) {
      await adventureLobby.users().attach(user.id)
    }
    return response.json({
      ok: true
    })
  }
}

module.exports = PublicAdventureController
