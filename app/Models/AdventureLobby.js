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

  masters () {
    return this.manyThrough('App/Models/Adventure', 'masters', 'adventure_id', 'id')
  }

  socialMessages () {
    return this.hasMany('App/Models/SocialMessage')
  }
}

module.exports = AdventureLobby
