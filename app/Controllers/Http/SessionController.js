'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { username, password } = request.all()
    const token = await auth.attempt(username, password)
    return token
  }
}

module.exports = SessionController
