'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialMessage extends Model {
  character () {
    return this.belongsTo('App/Models/Character')
  }

  master () {
    return this.belongsTo('App/Models/Master')
  }
}

module.exports = SocialMessage
