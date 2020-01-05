'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class MasterAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params, auth, response }, next) {
    // call next to advance the request
    const master = await auth.user.master().where('id', params.masters_id).fetch()
    if (master === null) {
      response.status(401).json({
        error: {
          message: 'You do not own this master'
        }
      })
    }
    request.master = master
    await next()
  }
}

module.exports = MasterAuth
