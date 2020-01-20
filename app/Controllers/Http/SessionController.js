'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { username, password } = request.all()
    const token = await auth.withRefreshToken().attempt(username, password, true)
    return token
  }

  async update ({ request, auth }) {
    const refreshToken = request.input('refresh_token')

    const newJwtToken = await auth.generateForRefreshToken(refreshToken, true)

    return newJwtToken
  }
}

module.exports = SessionController
