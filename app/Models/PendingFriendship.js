'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PendingFriendship extends Model {
  static boot() {
    super.boot()
    this.addHook('afterCreate', 'PendingfriendHook.sendWs')
  }

  receiver () {
    return this.hasOne('App/Models/User', 'receiver_id', 'id')
  }

  sender () {
    return this.hasOne('App/Models/User', 'sender_id', 'id')
  }
}

module.exports = PendingFriendship
