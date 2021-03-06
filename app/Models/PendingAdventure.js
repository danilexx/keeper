'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PendingAdventure extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'PendingAdventureHook.sendWs')
  }

  receiver () {
    return this.hasOne('App/Models/User', 'receiver_id', 'id')
  }

  sender () {
    return this.hasOne('App/Models/User', 'sender_id', 'id')
  }

  adventure () {
    return this.hasOne('App/Models/Adventure', 'adventure_id', 'id')
  }
}

module.exports = PendingAdventure
