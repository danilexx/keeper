'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Character extends Model {
  attributes () {
    return this.hasOne('App/Models/Attribute')
  }

  experiences () {
    return this.hasOne('App/Models/Experience')
  }
}

module.exports = Character
