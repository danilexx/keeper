'use strict'
const moment = require('moment')
const User = use('App/Models/User')
const crypto = require('crypto')
const Mail = use('Mail')
class ForgotController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      const token = crypto.randomBytes(10).toString('hex')
      user.token = token
      user.token_created_at = new Date()
      await user.save()
      await Mail.send(['emails.forgot_password', 'emails.forgot_password-text'], {
        username: user.name,
        token,
        link: `${request.input('redirect_url')}?token=${user.token}`
      }, message => {
        message
          .to(user.email)
          .from('support@chronarium.com', 'Chronarium Support')
          .subject('Recuperação de senha')
      })
    } catch (err) {
      console.error(err)
      return response.status(err.status)
        .send({ error: { message: 'Algo não deu certo' } }
        )
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.only(['token', 'password'])
      const user = await User.findByOrFail('token', token)
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'O token de recuperação esta expirado'
          }
        })
      }
      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
    } catch (err) {
      console.error(err)
      return response.status(err.status)
        .send({ error: { message: 'Algo não deu certo' } }
        )
    }
  }
}

module.exports = ForgotController
