'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CharactersConfig extends Model {
  adventure () {
    return this.belongsTo('App/Models/Adventure')
  }
}

module.exports = CharactersConfig
