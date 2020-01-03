'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AdventureLobby extends Model {
  static get table () {
    return 'adventure_lobbies'
  }

  users () {
    return this.belongsToMany('App/Models/User').pivotTable('user_adventure_lobbies')
  }
}

module.exports = AdventureLobby
