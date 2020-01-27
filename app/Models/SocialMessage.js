'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialMessage extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'AdventureMessageHook.sendWs')
  }

  character () {
    return this.belongsTo('App/Models/Character')
  }

  master () {
    return this.belongsTo('App/Models/Master')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  adventure () {
    return this.manyThrough('App/Models/AdventureLobby', 'adventure', 'adventure_id', 'id')
  }

  adventureLobby () {
    return this.belongsTo('App/Models/AdventureLobby')
  }
}

module.exports = SocialMessage
