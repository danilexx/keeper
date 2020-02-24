'use strict'

class PrivateAdventureController {
  async store({ request, response, params, auth }) {
    const { password } = request.only(['password'])
    const { user } = auth
    const { adventure, isUserOnAdventure, adventureLobby } = request
    const isPasswordCorrect = await adventure.verifyPassword(password)
    if (!isPasswordCorrect) {
      return response.status(401).json({ error: { message: 'Password provided is wrong' } })
    }
    if (!isUserOnAdventure) {
      await adventureLobby.users().attach(user.id)
    }
    return response.status(200).send({
      ok: true
    })
  }
}

module.exports = PrivateAdventureController
