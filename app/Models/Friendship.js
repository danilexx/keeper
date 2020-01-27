'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Friendship extends Model {
  static boot() {
    super.boot()
    this.addHook('afterCreate', 'FriendshipHook.sendWs')
  }
}

module.exports = Friendship
