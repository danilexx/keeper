'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Skill extends Model {
  icon() {
    return this.hasOne('App/Models/File', 'icon_id', 'id')
  }
}

module.exports = Skill
